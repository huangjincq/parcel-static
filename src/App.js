import { useEffect } from 'react'
import axios from 'axios'

export function App() {
  useEffect(() => {
    axios
      .post('https://amysignup.testing.comm100dev.io/api/amy/login/thirdParty', {
        email: 'huangjincq@gmai2l.com',
        thirdPartyToken: 'xxxx',
        thirdPartyType: 0,
      })
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  return (
    <h1>
      <ul>
        <li>
          <a href="/parcel-static/html/amy_installed.html">Amy Install Preview Page</a>
        </li>
        <li>
          <a href="/parcel-static/html/test.html">Test 1</a>
        </li>
      </ul>
    </h1>
  )
}
