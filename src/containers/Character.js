import React from "react"
import { connect } from 'react-redux'
import Character from '../components/Character'

const CharacterContainer = () => {
    return <Character/>
}



const mapStateToProps = (state) => {
	return {

	}
}

const mapDispatchToProps = {

}


export default connect(mapStateToProps, mapDispatchToProps)(CharacterContainer)