import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import LikeButton from './LikeButton';
import MyButton from '../../util/MyButton';
import ChatIcon from '@material-ui/icons/Chat';
import DeleteScream from '../../components/scream/DeleteScream';
import ScreamDialog from './ScreamDialog';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    invisibleSeparator: {
        border: 'none',
        margin: 0
    },
}

export class Scream extends Component {
    render() {
        dayjs.extend(relativeTime);
        const { classes, scream : { 
            body,
            theme,
            subject,
            createdAt, 
            userImage,
            userHandle, 
            screamId, 
            likeCount, 
            commentCount },
    user:{
        authenticated,
        credentials: { handle }
    } } = this.props;

    //59

        const deleteButton = authenticated && userHandle === handle ? (
            <DeleteScream screamId={screamId}/>
        ) : null;


    // Only Show First 55 Characters when String is very long
    let bodydisplay = '';

    if (body.length >= 59){
            bodydisplay = body.substring(0, 55) + '...';
        }
    else {
            bodydisplay = body;
    }
            

        return (
           <Card className={classes.card}>
               <CardMedia
               image={userImage}
               title="Profile image" className={classes.image}/>
               <CardContent className={classes.content}>
                   <Typography 
                   variant="h5" 
                   color="primary">
                       <span>{theme}, <i>{subject}</i></span>
                       </Typography>
                       {deleteButton}
                   <Typography 
                   variant="body2" 
                   component={Link}
                   to={`/users/${userHandle}`}
                   color="textSecondary">
                       <span><i>{dayjs(createdAt).fromNow()}, by {userHandle}</i></span>
                       
                       </Typography>

                   <Typography variant="body1">
                       {bodydisplay}
                       </Typography>
                   <LikeButton screamId={screamId}/>
                   <span>{likeCount}  Like(s)</span>
                   <MyButton tip="Comments">
                       <ChatIcon color="primary"/>
                       </MyButton>
                   <span>{commentCount} Comment(s)</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
               </CardContent>

           </Card>
        )
    }
}

Scream.propTypes = {
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Scream));
