import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';
import {Route} from "react-router-dom";
import FullPost from "../FullPost/FullPost";

class Posts extends Component {
    state = {
        posts: [],
        selectedPost: {},
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axios.get('/Posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Remigio'
                    }
                });
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error);
                // this.setState({error: true})
            });
    }

    postSelectHandler = (idx) => {
      this.props.history.push({pathname:'/posts/'+idx});
    };

    render() {
        let posts = <p style={{textAlign: 'center'}}>ERROR!!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postSelectHandler(post.id)}/>
            ));
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url+"/:id"} exact component={FullPost}/>
            </div>)
    }
}

export default Posts;
