import React from 'react'
import logo from '../../Images/logo512.png'

import './Banner.css'
import { Link, withRouter } from 'react-router-dom'

class Banner extends React.Component {
    constructor(props){
        super(props)
        
        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)
        this.keySearch = this.keySearch.bind(this)

        this.state={
            value:""
        }
    }

    search(){
        this.props.onSearch(this.state.value)
        const {history} = this.props;
        history.push('/resultlist')
    }

    handleChange(e){
        this.setState({
            value:e.target.value
        })
    }
    
    keySearch(e){
        if(e.keyCode === 13){
            this.search()
        }
    }
    

    render() {
        return (
            <header>
                <Link to='/'><img src={logo} alt="Movie Logo" className="logo"/></Link>
                <label className="search" id="search">Search for movie</label>
                <input 
                    type="search" 
                    for="search" 
                    name="search" 
                    placeholder="Search for movie" 
                    autocomplete="off"
                    onChange={this.handleChange}
                    onKeyDown={this.keySearch}/>
                <Link to="/resultlist"><button id="submit" type="submit" className="submit" onClick={this.search}>Search</button></Link>
            </header>
        )
    }
}

export default withRouter(Banner)