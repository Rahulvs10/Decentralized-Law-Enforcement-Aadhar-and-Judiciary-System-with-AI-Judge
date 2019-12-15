import numpy as np
import csv
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, request, jsonify
from waitress import serve

app = Flask(__name__)

FILENAME = "./outfinal.csv"
dataset = pd.read_csv(FILENAME, header=None)
dataset.rename(columns={0: 'answer', 1: 'text'}, inplace=True)

def tf_idf(search_keys, dataframe, label):

	tfidf_vectorizer = TfidfVectorizer()
	tfidf_weights_matrix = tfidf_vectorizer.fit_transform(dataframe["text"].values.astype('U'))
	search_query_weights = tfidf_vectorizer.transform([search_keys])

	return search_query_weights, tfidf_weights_matrix

def cos_similarity(search_query_weights, tfidf_weights_matrix):

	cosine_distance = cosine_similarity(
		search_query_weights, tfidf_weights_matrix)
	similarity_list = cosine_distance[0]

	return similarity_list

def most_similar(similarity_list, min_talks=1):

	most_similar = []

	while min_talks > 0:
		tmp_index = np.argmax(similarity_list)
		most_similar.append(tmp_index)
		similarity_list[tmp_index] = 0
		min_talks -= 1

	return most_similar

# FILENAME = "/home/vivekuchiha/vithack/workspace/outfinal.csv"
# dataset = pd.read_csv(FILENAME, header=None)
# dataset.rename(columns={0: 'answer', 1: 'text'}, inplace=True)
# print(dataset["text"])
# query = input("Enter your name : ")
# search_query_weights, tfidf_weights_matrix = tf_idf(query, dataset, 'text')
# list = most_similar(cos_similarity(search_query_weights, tfidf_weights_matrix))
# for x in list:
#     print(dataset.loc[[x]])


def querystring(query):
	# query = input("Enter your name : ")
	search_query_weights, tfidf_weights_matrix = tf_idf(query, dataset, 'text')
	list = most_similar(cos_similarity(search_query_weights, tfidf_weights_matrix))
	return list

@app.route('/query', methods=['POST'])
def predict():
	print("Request /query")
	content = request.json
	if 'description' not in content:
		return jsonify({'Status': 'Bad Request'}), 400

	list = querystring(content['description'])
	return jsonify({'Link': dataset.loc[list[0], 'answer'], 'Text': dataset.loc[list[0], 'text']}), 201


@app.route('/add', methods=['POST'])
def addentry():
	print("Request /addentry")
	content = request.json
	if 'description' not in content or 'token' not in content:
		return jsonify({'Status': 'Bad Request'}), 400
	with open("./outfinal.csv", 'a') as csvfile:
		csvwriter = csv.writer(csvfile)
		csvwriter.writerow([content['token'],content['description']])
		return jsonify({'Status': 'Success'}), 201





serve(app, host='0.0.0.0', port=8000)
