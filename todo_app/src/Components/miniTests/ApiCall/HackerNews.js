import React from 'react';
import {ApiCaller} from './ApiCallerV5Semantic.js';
import PropTypes from 'prop-types'



function timeConverter(UNIX_timestamp){
	const a = new Date(UNIX_timestamp * 1000);
	const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

	const year 	= 	a.getFullYear();
	const month = 	months[a.getMonth()];
	const date 	= 	a.getDate();
	const hour 	= 	a.getHours();
	const min 	= 	a.getMinutes();
	const sec 	=	a.getSeconds();
	const time 	= 	(date > 9 ? date : `0${date}`) + ' ' + month + ' ' + year + ' ' + (hour > 9 ? hour : `0${hour}`) + ':' + (min > 9 ? min : `0${min}`) + ':' + (sec > 9 ? sec : `0${sec}`);
	return time;
}


export class HackerNewsApp extends React.Component {
	render () {
		return (
			<div>
				<TestArticle />
			</div>
		);
	}
}

class TestComment extends React.Component {

	render () {
		const testValues= {
			"by" : "norvig",
			"id" : 2921983,
			"kids" : [ 2922097, 2922429, 2924562, 2922709, 2922573, 2922140, 2922141 ],
			"parent" : 2921506,
			"text" : "Aw shucks, guys ... you make me blush",
			"time" : 1314211127,
			"type" : "comment"
		}
		if (testValues.type === 'comment'){
			return (
				<CommentWrapper {...testValues} depth={0} />
			);
		}
	}
}

export const Comment = (props) => {
	return (
		<div key={props.id} onClick={props.switchCollapse}>
			<div>by: {props.by}</div>
			<div>time: {timeConverter(props.time)}</div>
			<div>text: {props.text}</div>
		</div>
	);
}

export class CommentKidsWrapper extends React.Component {
	constructor(props) {
		super(props);

		this.renderSuccess = this.renderSuccess.bind(this, this.props.depth)
	}
	renderSuccess(depth, result) {
		return <CommentWrapper {...result} depth={depth}/>
	}
	render () {
		const style = (this.props.collapsed) ? { display:'none' } : {}
		if (this.props.load) {
			const kidList = this.props.kids.map(
				(kid) => {
					const urls = ["" + kid + ".json"]
					return (
						<li key={kid}>
							<ApiCaller 
								urlRoot={"https://hacker-news.firebaseio.com/v0/item"} 
								urls={urls}
								params={[]}
								success={this.renderSuccess}
							/>
						</li>
					);
				}
			)
			return (
				<ul style={style}>{kidList}</ul>
			);
		} else {
			return (
				<button style={style} onClick={this.props.setLoad}>There {this.props.kids.length === 1 ? "is an available comment " : "are " + this.props.kids.length + " available comments"}</button>
			);
		}
	}
}
CommentKidsWrapper.propTypes = {
	depth:	PropTypes.number.isRequired,
	collapsed: 	PropTypes.bool.isRequired,
	kids:	PropTypes.arrayOf(PropTypes.number).isRequired,
	load: 	PropTypes.bool.isRequired,
	setLoad: 	PropTypes.func.isRequired
}

export class CommentWrapper extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			collapsed: false,
			load: false
		};
		this.switchCollapse = this.switchCollapse.bind(this);
		this.setLoad = this.setLoad.bind(this);
	}
	setLoad(){
		this.setState({load: true});
	}
	switchCollapse(){
		this.setState({collapsed: !this.state.collapsed});
	}
	render() {
		return (
			<div>
				<Comment
					{...this.props}
					switchCollapse={this.switchCollapse}
				/>
				{
					this.props.kids && this.props.kids.length ?
					(<CommentKidsWrapper
						{...this.props}
						collapsed={this.state.collapsed}
						depth={this.props.depth + 1}
						load={this.state.load}
						setLoad={this.setLoad}
					/>) : null
				}
			</div>
		);
	}
}

CommentWrapper.propTypes = {
	depth:	PropTypes.number.isRequired,
	kids:	PropTypes.arrayOf(PropTypes.number)
}


class TestArticle extends React.Component {
	render () {
		const testValues= {
			"by" : "dhouston",
			"descendants" : 71,
			"id" : 8863,
			"kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 9067, 8940, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8980, 8870, 8934, 8876 ],
			"score" : 109,
			"time" : 1175714200,
			"title" : "My YC app: Dropbox - Throw away your USB drive",
			"type" : "story",
			"url" : "http://www.getdropbox.com/u/2/screencast.html"
		}
		return (
			<ArticleWrapper {...testValues} depth={0} />
		);
	}
}

export const CommentSection = (props) => {
	if (!(props.kids && props.kids.length))
		return <div>No Comment Available For Now</div>
	const comments = props.kids.map((kid) => {
		const urls = ["" + kid + ".json"]
		return (
			<div key={kid}>
				<ApiCaller 
					urlRoot={"https://hacker-news.firebaseio.com/v0/item"} 
					urls={urls}
					params={[]}
					success={(result) => {
						return 	<CommentWrapper {...result} depth={0}/>
					} }
				/>
			</div>
		);
	})
	return (
		<div>{comments}</div>
	);
}

export const Article = (props) => {
	return (
		<div>
			<div>by: {props.by}</div>
			<div>time: {timeConverter(props.time)}</div>
			<div>title: {props.title}</div>
			<div>url: {props.url}</div>
		</div>
	);
}

export class ArticleWrapper extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			//collapsed: false,
			//load: false
		};
		// this.switchCollapse = this.switchCollapse.bind(this);
		// this.setLoad = this.setLoad.bind(this);
	}
	// setLoad(){
	// 	this.setState({load: true});
	// }
	// switchCollapse(){
	// 	this.setState({collapsed: !this.state.collapsed});
	// }
	render() {
		return (
			<div>
				<Article {...this.props} />
				<CommentSection {...this.props}/>
			</div>
		);
	}
}
