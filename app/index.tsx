import React from 'react'
import { Redirect, Tabs } from 'expo-router'

const RootLayout = () => {
  return (
    <Redirect href="/(tabs)/albums" />
  )
}

export default RootLayout;