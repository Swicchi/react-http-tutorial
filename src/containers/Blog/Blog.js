import React, {Component} from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPost: {},
        selectedPostId: null,
        error: false
    };

    render() {

        return (
            <div>
                <header className={"Blog"}>
                    <nav>
                        <ul>
                            <li><NavLink to={"/"} exact>Home</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '',
                                search: ''
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path={"/"} exact component={Posts}/>
                    <Route path={"/new-post"} exact component={NewPost}/>
                    <Route path={"/:id"} exact component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;
