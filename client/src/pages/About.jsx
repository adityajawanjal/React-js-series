import React from 'react'
import Layout from '../components/Layout'
import Carousal from '../components/Carousal'

const About = () => {
  return (
    <Layout title={'Shoppy Karo ! About'}>
      <div className="flex flex-col my-10">
        <Carousal/>
      </div>
    </Layout>
  )
}

export default About
