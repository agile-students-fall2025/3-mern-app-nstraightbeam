import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

/**
 * A React component that represents the About Us page of the app.
 * Fetches content from the backend API and displays information about the developer.
 * @param {*} props an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  const [aboutData, setAboutData] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * Fetch about data from the backend when component mounts
   */
  useEffect(() => {
    // Fetch the about data from the backend
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const data = response.data
        setAboutData(data)
        setLoaded(true)
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2)
        setError(errMsg)
        setLoaded(true)
      })
  }, []) // empty dependency array means this runs once on mount

  // Show loading state
  if (!loaded) {
    return (
      <div className="AboutUs">
        <h1>About Us</h1>
        <img src={loadingIcon} alt="loading" className="loading-icon" />
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <div className="AboutUs">
        <h1>About Us</h1>
        <p className="AboutUs-error">Error loading content: {error}</p>
      </div>
    )
  }

  // Show the about content once loaded
  return (
    <div className="AboutUs">
      <h1>About Us</h1>
      
      {aboutData && (
        <div className="AboutUs-content">
          <div className="AboutUs-header">
            <img 
              src={aboutData.imageUrl} 
              alt={aboutData.name}
              className="AboutUs-photo"
            />
            <div className="AboutUs-header-info">
              <h2>{aboutData.name}</h2>
              <p className="AboutUs-location">{aboutData.location}</p>
              <p className="AboutUs-education">{aboutData.education}</p>
            </div>
          </div>

          <div className="AboutUs-bio">
            {aboutData.bio.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="AboutUs-interests">
            <h3>Interests</h3>
            <ul>
              {aboutData.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))}
            </ul>
          </div>

          <div className="AboutUs-gaming">
            <h3>Currently Playing</h3>
            <div className="AboutUs-games">
              {aboutData.currentlyPlaying.map((game, index) => (
                <span key={index} className="AboutUs-game-tag">
                  {game}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// make this component available to be imported into any other file
export default AboutUs