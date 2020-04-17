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
        youranswer: '',
        empty: true
    };

    componentDidMount(){
        if (this.props.openDialog) {
            this.handleOpen();
        }
    }

    handleOpen = () => {
     //  let { toTest, user } = this.props;
        this.setState({ open: true})//, oldPath, newPath })

     //this.props.getScream(this.props.screamId);
     if (typeof this.props.toTest[0] !== 'undefined')
        {
        this.setState({ open: true, empty: false})
        this.props.getScream(this.props.toTest[0].screamId);
        }
        
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
        this.setState({ showForm: true, empty: true})
        this.props.clearErrors();
    };

    successTest = (likeId) => {
        console.log('Clicked Right');
        this.props.validateTest(likeId);
        this.props.toTest.shift();
        console.log(this.props.toTest);
        console.log(this.props.toTest);
        if (typeof this.props.toTest[0] === 'undefined')
        {
            if (!this.state.empty) 
            {
                this.setState({ empty: true})
            }
        } else {
            if (this.state.empty)
            {
                this.setState({ empty: false})
            }
            this.props.getScream(this.props.toTest[0].screamId);
        }
        this.setState({ showForm: true})
      };

    failTest = (likeId) => {
        //console.log('Clicked Wrong');

        //console.log(this.props.toTest)        
        let temp = this.props.toTest[0]
        
        this.props.toTest.shift();
        temp.testedAt = new Date().toISOString()
        temp.level = 1
        this.props.toTest.push(temp)

        console.log(this.props.toTest)
        this.props.invalidateTest(likeId);
        
        if (typeof this.props.toTest[0] === 'undefined')
        {
            if (!this.state.empty) 
            {
                this.setState({ empty: true})
            }
        } else {
            if (!this.state.empty) 
            {
                this.setState({ empty: false})
            }
            this.props.getScream(this.props.toTest[0].screamId);
        }

        this.setState({ showForm: true})
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
        let ls = keywords.split(',')
        let i
        let ans
        let grade = 0
        let yourans = youranswer.toLowerCase()
        let valid_answer = []
        let wrong_answer = []
        //console.log(ls.length)
        for (i = 0; i < ls.length; i++) {
            ans = ls[i].trim().toLowerCase()
            if (yourans.includes(ans)) {
                grade++
                valid_answer.push(ans)
            } else {
                wrong_answer.push(ans)
            }
         //   console.log(ans)
           // console.log(yourans.includes(ans))
        }
        grade = (grade/ls.length)* 100
        //console.log(grade)
        //console.log(valid_answer)
        //console.log(wrong_answer)
        //console.log(wrong_answer.toString().replace(',', ', '))
        let wrong_str = wrong_answer.toString()
        wrong_str = wrong_str.replace(/,/g, ", ")
        let valid_str = valid_answer.toString()
        valid_str = valid_str.replace(/,/g, ", ")
        /*
        let j = h.replace(/[^\x20-\x7E]/g, '');
        console.log(j)
        let k = j.replace(",", ", ")
        console.log(k)
        let l = k.replace(/,/g, ", ")
        console.log(l)
        console.log(typeof(wrong_answer))
        */

        /*Backup 
        <Typography variant="body1">
                       <span><u>Your Answer</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                  style={{whiteSpace: 'pre-line'}}>
                       {valid_str}
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


        */

        return (
            <Fragment>
                <Typography variant="body1">
                       <span><u>Your Grade</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                  style={{whiteSpace: 'pre-line'}}>
                       {grade}
                   </Typography>
                   <Typography variant="body1">
                       <span><u>You succeed on :</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                   color="primary"
                  style={{whiteSpace: 'pre-line'}}>
                       {valid_str}
                   </Typography>
                   <Typography variant="body1">
                       <span><u>You failed on :</u> :</span>
                   </Typography>
                   <Typography 
                   variant="body1"
                   color="secondary"
                  style={{whiteSpace: 'pre-line'}}>
                       {wrong_str}
                   </Typography>
                
                   <Button 
    type="button" 
   variant="contained" 
   color="secondary"
   onClick={() => {

       this.failTest(this.props.toTest[0].likeId)
    
    }}
            className = {classes.wrongButton} disabled={loading}>
                Wrong
                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
               
            </Button>
            <Button 
    type="button" 
   variant="contained" 
   color="primary"
   onClick={() => {

       this.successTest(this.props.toTest[0].likeId)
    
    }}
            className = {classes.submitButton} disabled={loading}>
                Right
                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
               
            </Button>
                   </Fragment>

        );}

        showEmpty = (classes, loading, answer, keywords, youranswer) => {
            return (
                <Fragment>
                    <Typography variant="body1">
                           <span><u>Empty</u> :</span>
                       </Typography>
                       <Typography 
                       variant="body1"
                      style={{whiteSpace: 'pre-line'}}>
                           'Amazing, it appears you already tested everything !! Come back later'
                       </Typography>
                       <Button 
        type="button" 
       variant="contained" 
       color="secondary"
       onClick={() => {
           this.handleClose()
        }}
                className = {classes.wrongButton} disabled={loading}>
                    Close
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

        const dialogMarkup = this.state.empty ? (
             <Fragment>
            <Typography variant="body1">
            <span><u>Congratulations</u> :</span>
        </Typography>
        <Typography 
        variant="body1"
       style={{whiteSpace: 'pre-line'}}>
            Amazing, it appears you already tested everything !! Come back later
        </Typography>
        <Button 
type="button" 
variant="contained"  
color="secondary"
onClick={() => {
this.handleClose()
}}
 className = {classes.wrongButton} disabled={loading}>
     Close
     {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
    
 </Button>
 </Fragment>
            
            ): (loading ? (
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
                    {
                //    this.state.empty ? this.showEmpty(classes) : (
               //     (typeof this.props.toTest[0] === 'undefined' ?)
                    this.state.showForm ? this.showForm(classes, loading) : this.showAnswer(classes, loading, answer, keywords, youranswer)
                  //  )
                    }
                </Grid>
            </Grid>
        ));


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
    //likes: PropTypes.array.isRequired,
    toTest: PropTypes.array
    //Check why isRequired give error
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI,
  //  likes: state.user.likes,
    user: state.user,
    toTest: state.user.toTest
})

const mapActionsToProps = {
    getScream,
    clearErrors,
    validateTest,
    invalidateTest,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(TestDialog));