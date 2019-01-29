import React, {Component} from 'react';
import {NavLink, Route, Switch, Redirect} from 'react-router-dom';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
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
                            <li><NavLink to={"/posts/"} exact>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: "/new-post",
                                hash: '',
                                search: ''
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path={"/new-post"} component={NewPost}/>
                    <Route path={"/posts"}  component={Posts}/>
                    <Redirect from={"/"} to={"/posts"}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;
