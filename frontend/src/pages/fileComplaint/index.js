import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {fetchSimilar, queryCase} from "utils/dataFetch";
import moment from "moment";
import CaseCard from "../../components/caseCard";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: 'fit-content', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        width: 'fit-content',
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    button: {
        width: "200px",
        margin: "16px 16px",
    }
}));

export default function FileComplaint(props) {
    const classes = useStyles();

    const [formData, setFormData] = useState({date: new Date('2019-12-15T21:11:54')});
    const [error, setError] = useState({});
    const [similar, setSimilar] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(!!props.caseId);
    const [desc, setDesc] = useState(null);

    let handleFetch = () => {
        setDesc(formData.description);
    };



    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const result = await queryCase("/getCase", props.caseId);
                console.log("Case: ", result);
                setFormData(result);
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        };
        if (props.caseId) fetchData();
    }, [props.caseId]);

    useEffect(() => {
        const fetchData = async () => {
            setError(null);
            setIsLoading(true);
            try {
                const result = await fetchSimilar("/query", desc);
                setSimilar([result])
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false);
        };
        if (desc) fetchData();
    }, [desc]);


    let handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        console.log(formData);

        setFormData(formData => {
            formData[name] = value;
            return formData;
        });

    };

    let handleDateChange = (date) => {
        setFormData(formData => {
            formData.date = date;
            return formData;
        });
    };

    useEffect(() => {
        moment(formData.date).format("DD-MM-YYYY")
    }, [formData]);

    let validateForm = () => {
        let errors = {};

        for (let key in formData) {
            if (formData.hasOwnProperty(key)) {
                let val = formData[key];
                if (!val) {
                    errors[key] = "Can't be empty";
                }
            }
        }

        // if (isEmpty(errors)) {
        //     setRequest(formData);
        // } else {
        //     return errors;
        // }
    };

    let submitForm = (e) => {
        e.preventDefault();
        let errors = validateForm();
        if (errors === true) {
            console.log(formData);
        } else {
            console.log("errors: ", errors);
            setError(errors);
        }
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    File complaint
                </Typography>
                <form className={classes.form} onSubmit={submitForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="stationCode"
                                label="Station Code"
                                id="stationCode"
                                onChange={handleInputChange}
                                value={formData.stationCode}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid style={{display: "flex", flexDirection: "column"}} item xs={12} sm={6}>
                            <MuiPickersUtilsProvider style={{marginTop: "0px !important"}} utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    style={{marginTop: "0px !important"}}
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date"
                                    label="Date"
                                    value={formData.date}
                                    onChange={handleDateChange}
                                    disabled={disabled}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                name="caseNo"
                                variant="outlined"
                                fullWidth
                                id="caseNo"
                                value={formData.caseNo}
                                label="Case Number"
                                autoFocus
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="copIncharge"
                                value={formData.copIncharge}
                                label="Cop in charge"
                                name="copIncharge"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="victimName"
                                value={formData.victimName}
                                label="Victim Name"
                                name="victimName"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                multiline
                                rows="4"
                                id="description"
                                value={formData.description}
                                label="Case Description"
                                name="description"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="accusedName"
                                value={formData.accusedName}
                                label="Accused Name"
                                id="accusedName"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="accusedPhNo"
                                value={formData.accusedPhNo}
                                label="Accused Phno."
                                id="accusedPhNo"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="penalCodes"
                                value={formData.penalCodes}
                                label="Penal Codes"
                                id="penalCodes"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="CourtAssigned"
                                value={formData.CourtAssigned}
                                label="Court Assigned"
                                id="CourtAssigned"
                                onChange={handleInputChange}
                                InputProps={{
                                    readOnly: disabled,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Grid className={classes.submit}>
                        <Button
                            className={classes.submit}
                            variant="outlined"
                            color="secondary"
                            onClick={handleFetch}
                            style={{margin: "16px !important"}}
                            disabled={isLoading}
                        >
                            {
                                isLoading ? "Fetching" : "Similar cases"
                            }
                        </Button>
                        <Button
                            className={classes.submit}
                            type="submit"
                            variant="contained"
                            disabled={isLoading}
                            color="primary"
                        >
                            {
                                isLoading ? "Saving" : "Save"
                            }
                        </Button>
                    </Grid>
                </form>
            </div>
            {similar.length > 0 &&
            <div>
                <Typography component="h1" variant="h5">
                    Similar cases
                </Typography>
                {
                    similar.map(item => {
                        return (
                            <CaseCard
                                key={item.Link}
                                link={item.Link}
                                description={item.Text}
                            >
                                {console.log(item)}
                            </CaseCard>
                        )
                    })
                }
            </div>
            }
        </Container>
    );
}