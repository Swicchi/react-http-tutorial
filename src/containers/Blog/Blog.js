import React, {Component} from 'react';
import axios from 'axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: {},
        selectedPostId: null,
        error: false
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4);
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
                this.setState({error: true})
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
        let posts = <p style={{textAlign: 'center'}}>ERROR!!</p>
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
                <section>
                    <FullPost id={this.state.selectedPostId} body={this.state.selectedPost.body}
                              title={this.state.selectedPost.title}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;