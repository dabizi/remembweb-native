import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';


import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import CloseIcon from '@material-ui/icons/Close';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';
import { getScream, clearErrors, validateTest, invalidateTest } from '../../redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadThis,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    wrongButton: {
        marginRight: 30
    }
});

class TestDialog extends Component {

    state = {
        open: false,
        showForm: true,
        youranswer: ''
    };

    componentDidMount(){
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
        const { likes, user } = this.props;
        //WIP
        console.log(user);
        console.log(likes);
        console.log(likes[1].screamId);
        console.log(likes[1].likeId);
       //Prob : no like id in the likes
        this.setState({ open: true})//, oldPath, newPath })
     //  this.props.getScream(this.props.screamId);
        this.props.getScream(this.props.likes[1].screamId);
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    };

    handleCheck = (event) => {
        event.preventDefault();
        this.setState({ showForm: false})
       this.setState({ [event.name]: event.value });
    };

    handleClose = () => {
        this.setState({ open: false })
        this.setState({ showForm: true})
        this.props.clearErrors();
    };

    successTest = (likeId) => {
        console.log('Clicked Right');
        this.props.validateTest(likeId);
      };

    failTest = (likeId) => {
        console.log('Clicked Wrong');
        this.props.invalidateTest(likeId);
   //     this.props.invalidateTest("NjXJjroYRokPiCqXSyoU");
      };

    showForm = (classes, loading) => {
        return (
            <form onSubmit={this.handleCheck}>
                <Typography variant="body1">
                       <span><u>Answer</u> :</span>
                   </Typography>
            <TextField
            name="youranswer"
            type="text"
            label="Answer"
            multiline
            rows="5"
            placeholder="Write your general answer"
            className={classes.textField}
            onChange={this.handleChange}
            fullWidth
            />
            <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            className = {classes.submitButton} disabled={loading}>
                Check
                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
               
            </Button>
        </form>
          );
      }

      showAnswer = (classes, loading, answer, keywords, youranswer) => {
        return (
            <Fragment>
                <Typography variant="body1">
                       <span><u>Your Answer</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                  style={{whiteSpace: 'pre-line'}}>
                       {youranswer}
                   </Typography>
                   <Typography variant="body1">
                       <span><u>General Answer</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                  style={{whiteSpace: 'pre-line'}}>
                       {answer}
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                   <Typography variant="body1">
                       <span><u>Keywords</u> :</span>
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                   <Typography variant="body1">
                       {keywords}
                   </Typography>
                   <Button 
    type="button" 
   variant="contained" 
   color="secondary"
   onClick={() => {this.failTest(this.props.likes[1].likeId)}}
            className = {classes.wrongButton} disabled={loading}>
                Wrong
                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
               
            </Button>
            <Button 
    type="button" 
   variant="contained" 
   color="primary"
   onClick={() => {this.successTest(this.props.likes[1].likeId)}}
            className = {classes.submitButton} disabled={loading}>
                Right
                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
               
            </Button>
                   </Fragment>

        );}

    render(){
        const {classes, scream: { 
            body,
            theme,
            subject,
            answer,
            keywords,
            createdAt, 
            userImage,
            userHandle
        },
            UI: { loading }} = this.props;

            const youranswer = this.state.youranswer;


        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={200} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={2}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage}/>
                    <hr className={classes.invisibleSeparator}/>
                </Grid>
                <Grid item sm={7}>
                   <Typography
                   color="primary"
                   variant="h5">
                       <span>{theme}, <i>{subject}</i></span>
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                   <Typography 
                   variant="body2" 
                   component={Link}
                   color="textSecondary"
                   to={`/users/${userHandle}`}>
                       <span><i>{dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} by {userHandle}</i></span>
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                   <Typography variant="body1">
                       <span><u>Question</u> :</span>
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                   <Typography variant="body1">
                       {body}
                   </Typography>
                   <hr className={classes.invisibleSeparator}/>
                    {this.state.showForm ? this.showForm(classes, loading) : this.showAnswer(classes, loading, answer, keywords, youranswer)}
                </Grid>
            </Grid>
        );


        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Test" tipClassName={classes.expandButton}>
                    <ScheduleIcon color="primary"/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
            
        )
    }
}

TestDialog.propTypes = {
    clearErrors: PropTypes.func.isRequired,
    getScream: PropTypes.func.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    validateTest: PropTypes.func.isRequired,
    invalidateTest: PropTypes.func.isRequired,
    likes: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI,
    likes: state.user.likes,
    user: state.user
})

const mapActionsToProps = {
    getScream,
    clearErrors,
    validateTest,
    invalidateTest,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TestDialog));