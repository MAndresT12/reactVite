import { useState } from "react"

export function TwitterFollowCard ({children, username, initialIsFollowing}) {
    
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)

    //Lo mismo de arriba
    // const state = useState(false) //Valor inicial de nuestro estado (defecto)
    // const isFollowing = state[0]
    // const setIsFollowing = state[1]

    
    console.log(isFollowing)
    const text = isFollowing ? 'Siguiendo' : 'Seguir' 
    const buttonClass = isFollowing 
    ?  'tw-followCard-button is-following' 
    : 'tw-followCard-button'

    const handleClick = () => (
        setIsFollowing(!isFollowing) //Vamos a dar la vuelta (si true poner false y)
    )


    const imageSrc = `https://unavatar.io/${username}`
    return(
        <article className='tw-followCard'>
            <header className='tw-followCard-header'>
                <img  className='tw-followCard-avatar'
                src={imageSrc} alt="avatar de midu dev" />
                <div className='tw-followCard-info'>
                    <strong>{children}</strong>
                    <span className='tw-followCard-infoUserName'>@{username}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClass} onClick={handleClick}>
                <span className='tw-followCard-text' > {text}</span>
                <span className='tw-followCard-stopFollow' > Dejar de seguir</span>
                </button>
            </aside>
        </article>
        )
}