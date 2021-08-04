import React from 'react'
import logo from '../../Images/logo512.png'

import './Banner.css'
import { Link } from 'react-router-dom'

export default class Banner extends React.Component {
    constructor(props){
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)

        this.state={
            value:""
        }
    }

    search(){
        this.props.onSearch(this.state.value)
    }

    handleChange(e){
        this.setState({
            value:e.target.value
        })
    }        

    render() {
        return (
            <header>
                <img src={logo} alt="Movie Logo" className="logo"/>
                <label className="search" id="search">Search for movie or film star</label>
                <input 
                    type="search" 
                    for="search" 
                    name="search" 
                    placeholder="Search for movie or film star" 
                    autocomplete="off"
                    onChange={this.handleChange}/>
                <Link to="/resultlist"><button type="submit" className="submit" onClick={this.search}>Search</button></Link>
            </header>
        )
    }
}
