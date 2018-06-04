import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {shallow, mount} from 'enzyme';
configure({ adapter: new Adapter() });







describe('<App />', ()=> {
	it('renders an input', () => {
		  const wrapper = mount(<App />);
		  expect(wrapper.find('input').length).toEqual(6);
		});
    it('renders an input type', () => {
		  const wrapper = mount(<App />);
		  expect(wrapper.find('form').type()).toEqual('form');
		});

	it('renders an ContactList', () => {
		  const wrapper = mount(<App />);
		  expect(wrapper.find('ContactList').length).toEqual(1);
		});

      it('has a title', () => {
		  const wrapper = mount(<App />);
		  expect(wrapper.contains(<h1 className="App-title">simple contact base</h1>)).toEqual(true);
		});


	it('renders without crashing', () => {
	  const div = document.createElement('div');
	  ReactDOM.render(<App />, div);
	  ReactDOM.unmountComponentAtNode(div);
	});
});
