import { Route, Routes, useLocation } from 'react-router-dom'
import { authRoutes, publicRoutes } from 'router/routes.ts'
import { Navbar } from 'layouts/Navbar/Navbar.tsx'
import classes from './AppRouter.module.scss'
import { Button } from 'components/UI/Button/Button.tsx'

const AuthRoutes = () => (
  <div className={classes.container}>
    <Navbar />
    <div className={classes.content}>
      <div className={classes.top}>
        <Button>Выйти из профиля</Button>
      </div>
      <div className={classes.bottom}>
        <Routes>
          {authRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </div>
    </div>
  </div>
)

const PublicRoutes = () => (
  <Routes>
    {publicRoutes.map(({ path, Component }) => (
      <Route key={path} path={path} element={<Component />} />
    ))}
  </Routes>
)

const AppRouter = () => {
  const location = useLocation()

  const privateKeywords = [
    '/cabinet',
    '/companies',
    '/info-user',
    '/info-login',
    '/calendar',
    '/services',
    '/employees',
    '/work-schedule',
  ]
  const isPrivateRoute =
    privateKeywords.filter((keyword) => location.pathname.includes(keyword)).length > 0

  return (
    <Routes>
      <Route path="/*" element={isPrivateRoute ? <AuthRoutes /> : <PublicRoutes />} />
    </Routes>
  )
}

export default AppRouter
