import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

//REDUX
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/actions/dataActions';

//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import MyButton from '../../util/MyButton';
 


const styles = (theme) => ({
    ...theme.spreadThis,
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    }
});

class PostScream extends Component{
    state = {
        open: false,
        body: '',
        subject: '',
        theme: '',
        answer: '',
        keywords: '',
        source: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            });
        };
        if (!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, errors: {}});
        }
    }
    handleOpen = () => {
        this.setState({ open: true })
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value})
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postScream({ 
            body: this.state.body, 
            subject: this.state.subject, 
            theme: this.state.theme, 
            answer: this.state.answer,
            keywords: this.state.keywords,
            source: this.state.source
         });
    }
    render(){
        //TODO in Dialog : Add Errors for non-body name
        const {errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <Fragment>
                <MyButton onClick={this.handleOpen} tip="Post a Scream !">
                    <AddIcon/>
                </MyButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon/>
                    </MyButton>
                    <DialogTitle>Post something to remember</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                        <TextField
                            name="theme"
                            type="text"
                            label="Theme"
                            placeholder="Theme (ex : History)"
                            error={errors.theme ? true : false}
                            helperText={errors.theme}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            <TextField
                            name="subject"
                            type="text"
                            label="Subject"
                            placeholder="Subject (ex : Louis XVI)"
                            error={errors.subject ? true : false}
                            helperText={errors.subject}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            <TextField
                            name="body"
                            type="text"
                            label="Question"
                            multiline
                            rows="3"
                            placeholder="Write your general question"
                            error={errors.body ? true : false}
                            helperText={errors.body}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            <TextField
                            name="answer"
                            type="text"
                            label="Answer"
                            multiline
                            rows="2"
                            placeholder="Write your general answer"
                            error={errors.answer ? true : false}
                            helperText={errors.answer}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            <TextField
                            name="keywords"
                            type="text"
                            label="Keywords"
                            placeholder="Keywords (ex : French King, 1754, 1793, Ancien Regime)"
                            error={errors.body2 ? true : false}
                            helperText={errors.body2}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            <TextField
                            name="source"
                            type="text"
                            label="Source"
                            placeholder="Source (ex : The Life of Louis XVI by John Hardman)"
                            error={errors.body2 ? true : false}
                            helperText={errors.body2}
                            className={classes.textField}
                            onChange={this.handleChange}
                            fullWidth/>
                            
                            <Button type="submit" variant="contained" color="primary"
                            className = {classes.submitButton} disabled={loading}>
                                Submit
                                {loading && ( <CircularProgress size={30} className={classes.progressSpinner}/>)}
                               
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))