import React from 'react'
import'@testing-library/jest-dom/extend-expect'
import {fireEvent, render} from '@testing-library/react'
import App from '../App'
import Login from './pages/Login'
import Register from './pages/Register'
import {configure, shallow} from 'enzyme'
import { BrowserRouter } from 'react-router-dom'
import reactDOM from 'react-dom'
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

test('renders App withput crashing', () => {
    shallow(<App/>)
})

test('has a link', () => {
    const root = document.createElement('div')
    reactDOM.render(<BrowserRouter><Login/></BrowserRouter>, root)
    expect(root.querySelector('a').textContent).toBe("Submit")
})

test('render email imput', () => {
    const root = document.createElement('div')
    reactDOM.render(<BrowserRouter><Register/></BrowserRouter>, root)
    const inputEl = root.getElementsByClassName('email-test')
    inputEl.textContent = 'test@gmail.com'
    expect(root.getElementsByClassName('email-test').textContent).toBe('test@gmail.com')
})