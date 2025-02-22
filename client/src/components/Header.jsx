import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function renderContent(auth) {
    switch (auth) {
        case null:
            return ''
        case false:
            return <li><a href="/auth/google">Login with Google</a></li>
        default:
            return <li><a href="/api/logout">Logout</a></li>
    }
}

const Header = () => {
    const auth = useSelector((state) => state.auth)

	return (
		<nav>
			<div className='nav-wrapper'>
                <Link
                    to={auth ? '/surveys' : '/'}
                    className='left brand-logo'
                >
                    Emaily
                </Link>
				<ul className='right'>
					{renderContent(auth)}
				</ul>
			</div>
		</nav>
	)
}

export default Header
