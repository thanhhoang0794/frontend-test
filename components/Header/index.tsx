import { useEffect } from 'react'
import { useAuth } from 'hooks/useAuth'
const Header = () => {
  const { loginHandler } = useAuth()

  useEffect(() => {
    loginHandler()
  }, [])

  return <div>This is header</div>
}

export default Header
