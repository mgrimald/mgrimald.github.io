import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react'
import { HeaderLinks } from "./HeaderLinks.js";

export const Homepage = (props) => {
	return (
		<div>
			<HeaderLinks baseUrl={props.match.url} links={props.links}/>
			<Container text>
				{/*
					Segment introduction
				*/}
				<Segment>
					<p>
						Hello!<br/>My name is <strong>Merlin Grimaldi</strong>.<br/>
						I am also know as <strong>mgrimald</strong>.<br/>
						This pseudo come from my school, <a href="http://www.42.fr/">42</a>.<br/>
						But we are not here to talk about my name, are we ?<br/>
					</p>
					{/*<p>We are here to talk about:</p>
						<ul>
							<li>React</li>
							<li> React Router</li>
							<li> SemanticUi</li>
							<li>and, I hope, a lot of cool stuff</li>
						</ul>					*/}
				</Segment>
				{/*
					Segment why this website
				*/}
				<Segment>
					<p>
						Before anything else, I am using this website/Github to <strong>learn</strong> and to <strong>practice</strong>!<br/>
						I have a good background in C/C++ and algorithmics.<br/>
						I have worked on various projects outside of school.<br/>
					{/*<p>We are here to talk about:
						But I never really made projects where </p>*/}
						With theses I learned a lot on the server-side: database, server management/operating, backend, protocols.<br/>
						With all this knowledge, I could do a lot of things, but I couldn't show much.<br/>
						I was able to show raw html, I was able to show data inside html.<br/>
						But I didn't want to have to be limited to that.<br/><br/>
						Too many time I saw projects I could have worked on, I could have helped build.<br/>
						I wanted challenge and I wanted to be able to make presentable front-end product, so I could also utilize and promote my backend's.<br/><br/>
						I started working with React, and here we are.
					</p>
				</Segment>

				{/*
					Segment on the techno I work on here: 
				*/}
				<Segment textAlign={"center"}>
					<Header >React</Header>
					<a href="https://reactjs.org/">React</a> is a JS library for building user interfaces.<br/>
					It can be use to produce single page web app or mobile applications.<br/>
					<br/>
					<a href="https://reacttraining.com/react-router/web">React Router</a> is a library that help create multipage web app
				</Segment>
				<Segment textAlign={"center"}>
					<Header >Semantic Ui</Header>
					<a href="https://semantic-ui.com">Semantic UI</a> is a development framework used to help dev create User Interface<br/>
					<a href="https://react.semantic-ui.com">React Semantic UI</a> is its official React integration<br/>
				</Segment>
				<Segment>
					<Header>Why would you use two framework (<strong>React</strong> AND <strong>SemanticUI</strong>) for User Interface ?</Header>
					<p>Short answer:</p>
					<Segment textAlign={"center"}>Because they have different purpose. Like html/css</Segment>
					<p>Complete answer:</p>
					<Segment attached={"top"} textAlign={"center"}>
						React helps <strong>structuring</strong> the UI, it's basicaly<br/>
						"create your own 'Mark-up' tag (xml-like) and put them where you need it"
					</Segment>
					<Segment attached={"bottom"} textAlign={"center"}>
						Semantic helps <strong>displaying</strong> the UI, it's <br/>
						"Here are some stylised element.<br/>
						So you don't have to create your style from scratch.<br/>
						Better yet, these styles have been thought specialy to be nice on a website"<br/>
					</Segment>

				{/*
					Segment CV et competences: 
						-> shell, 
						-> C,
						-> C++,
						-> understanding of asm, 
						-> php/moodle (dislike),
						-> moodle (dislike),
						-> basic ops : (apache, nginx, ssh, sso/CAS, docker, /aws/, ssl, mySql, git)
						- API REST: creation and use,
						- plugin/extension chrome
						- python, django, flask
						> React (+ libs ?)
						> Semantic-Ui,
						> Material-Ui

						google docs "as server"
						firebase, mongoDb, sql, redis

						react app
						electron

						nodeJs,

						<ul>
							<li> modification of a Moodle <a href="http://formaparkinson.fr/"></a> : </li>
							<li> creation a few API (django, flask)</li>
							<li> creation of a plugin chrome (overlay youtube)</li>
							<li> liste de qq projets 42</li>
						</ul>						
				*/}
				</Segment>

				<Segment>
					<p>
						This website is hosted on <a href="https://pages.github.com/">GithubPages</a> and is avaible at <a href="mgrimald.github.io">mgrimald.github.io</a><br/>
						All the sources are avaible <a href="https://github.com/mgrimald/mgrimald.github.io/tree/react/todo_app">here</a><br/>
						You can go around, mess with things, no change is permanent (for now).
					</p>
					<p>
						there are currently 4 main "app":
					</p>
					<ul>
						<li>
							<a href="/">Homepage</a>:<br/> you are currently on it.
						</li>
						<li>
							<a href="/semantic">semantic/todo app</a>:<br/> it's a basic todo app, nothing spectacular.<br/>
							It helped me learn and practice React (inputs,states,props,components,eventHandler)(+router+semantic) without caring too much about this first project.<br/>
							I will definitively create it from square one ... One day, I will.
						</li>
						<li>
							<a href="/Games">Games</a>:<br/> For now its a Work In Project.<br/>Eventually there should have several simple games and maybe, maybe, a few more complexes.
						</li>
						<li>
							<a href="/tests">tests</a>:<br/> It's this area where you created things just to test how it is done, without caring about the appareance.<br/>Or to practice a little trick<br/>Or to create some one shot component.<br/>
							Currently there is a single test: a Clock that display the current time (HH:mm:ssAM)and can be paused or resumed.<br/>
							Its goal was to create the final version but adding just an element by version.<br/>
							The very first one (ClockV0) is just a static component with static text, ClockV1 show the time of rendering. It doesn't update before the Clock V4
						</li>
					</ul>
				</Segment>
				<Segment>
					<Header> You can hit me up at <a>merl1gri+mgrimald{"@"}gmail{"."}com</a> </Header>
				</Segment>
			</Container>

		</div>
	);
};