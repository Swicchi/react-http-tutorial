import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';

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
        const selectedPostIndex = this.state.posts.findIndex(p => {
            return p.id === idx;
        });
        const selectedPost = {...this.state.posts[selectedPostIndex]};
        this.setState({
            selectedPost: selectedPost,
            selectedPostId: idx
        })
    };

    render() {
        let posts = <p style={{textAlign: 'center'}}>ERROR!!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => (
                <Link key={post.id}
                      to={'/' + post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectHandler(post.id)}/>
                </Link>
            ));
        }
        return (
            <section className="Posts">
                {posts}
            </section>)
    }
}

export default Posts;
