import React from 'react'
import loadable from '@loadable/component'
import { Router, Redirect } from '@reach/router'

import ConfirmOTPPage from './pages/Auth/ConfirmOTP/ConfirmOTPPage'
import NewPasswordConfirmedPage from './pages/Auth/NewPasswordConfirmed'
import LoginPage from './pages/Auth/Login/LoginPage'
import NewPasswordPage from './pages/Auth/NewPassword/NewPasswordPage'
import PasswordResetPage from './pages/Auth/PasswordReset/PasswordResetPage'
import AccountUnlockPage from './pages/Auth/AccountUnlock/AccountUnlockPage'
import SignUpPage from './pages/Auth/SignUp/SignUpPage'
import PendingApprovalPage from './pages/Auth/PendingApproval/PendingApprovalPage'
import SuspendedByPlatformPage from './pages/Auth/SuspendedByPlatform/SuspendedByPlatformPage'
import ConfirmCurrentEmailPage from './pages/Auth/ConfirmCurrentEmail/ConfirmCurrentEmailPage'
import ConfirmNewEmailPage from './pages/Auth/ConfirmNewEmail/ConfirmNewEmailPage'
import ConfirmDeletedEmployeeEmailPage from './pages/Auth/ConfirmDeletedEmployeeEmail/ConfirmDeletedEmployeeEmailPage'
import BrandsOnboardingStart from './pages/Onboarding/Brands/Start'
import BrandPersonalPage from './pages/Onboarding/Brands/Personal/BrandPersonalPage'
import BrandCompanyPage from './pages/Onboarding/Brands/Company/BrandCompanyPage'
import BrandInviteTeamMembers from './pages/Onboarding/Brands/InviteEmployees/InviteEmployeesPage'
import BrandsOnboardingCompletePage from './pages/Onboarding/Brands/complete'
import BrandAddressPage from './pages/Onboarding/Brands/Address/AddressPage'
import CustomersOnboardingStart from './pages/Onboarding/Customers/Start'
import EmployeesOnboardingStart from './pages/Onboarding/Employees/Start'
import EmployeesCompany from './pages/Onboarding/Employees/EmployeesCompany'
import EmployeesOnboardingComplete from './pages/Onboarding/Employees/complete'
import CustomersOnboardingComplete from './pages/Onboarding/Customers/complete'
import Dashboard from './pages/Dashboard'
import UserProfile from './pages/UserProfile'
import PrivateRoute from './components/organisms/PrivateRoute'
import Error from './components/organisms/Error'
import Error404 from './components/organisms/Error404'
import EngineeringInProcess from './pages/HomeComponent/EngineeringInProcess'

const Auth = loadable(() => import('./pages/Auth/Auth'))
const Onboarding = loadable(() => import('./pages/Onboarding/Onboarding'))
const OnboardingUserRoot = loadable(() => import('./pages/Onboarding/OnboardingUserRoot'))
const HomePage = loadable(() => import('./pages/HomeComponent/HomePage'))

const CompanyProfile = loadable(() => import('./pages/CompanyProfile'))

export default function Routes() {
  return (
    <Router>
      <Redirect from="/" to="dashboard" noThrow />
      <Redirect default from="/" noThrow to="/error404" />
      <Error path="error" />
      <Error404 path="error404" />
      <Dashboard path="/dashboard">
        <SignUpPage path="/invitation/:token" />
        <Redirect from="/" to="auth" noThrow />
        <Redirect default from="/" noThrow to="/dashboard/home/error404" />
        <Auth path="auth">
          <LoginPage path="/" />
          <ConfirmOTPPage path="otp" />
          <NewPasswordPage path="new-password" />
          <NewPasswordConfirmedPage path="new-password-confirmed" />
          <PasswordResetPage path="password-reset" />
          <AccountUnlockPage path="account-unlock" />
          <SignUpPage path="sign-up" />
          <SignUpPage path="sign-up/:token" />
          <PendingApprovalPage path="pending-approval" />
          <SuspendedByPlatformPage path="suspended-by-platform" />
          <ConfirmCurrentEmailPage path="confirm-current-email" />
          <ConfirmNewEmailPage path="confirm-new-email" />
          <ConfirmDeletedEmployeeEmailPage path="confirm-deleted-employee-email" />
          <Redirect default from="/" noThrow to="/dashboard/home/error404" />
        </Auth>

        <PrivateRoute as={Onboarding} path="onboarding">
          <OnboardingUserRoot path="brand">
            <BrandsOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <BrandCompanyPage path="company" />
            <BrandAddressPage path="address" />
            <BrandInviteTeamMembers path="team-members" />
            <BrandsOnboardingCompletePage path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>

          <OnboardingUserRoot path="manufacturer">
            <BrandsOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <BrandCompanyPage path="company" />
            <BrandAddressPage path="address" />
            <BrandInviteTeamMembers path="team-members" />
            <BrandsOnboardingCompletePage path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>

          <OnboardingUserRoot path="distributor">
            <BrandsOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <BrandCompanyPage path="company" />
            <BrandAddressPage path="address" />
            <BrandInviteTeamMembers path="team-members" />
            <BrandsOnboardingCompletePage path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>

          <OnboardingUserRoot path="dealer">
            <BrandsOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <BrandCompanyPage path="company" />
            <BrandAddressPage path="address" />
            <BrandInviteTeamMembers path="team-members" />
            <BrandsOnboardingCompletePage path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>

          <OnboardingUserRoot path="employee">
            <EmployeesOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <EmployeesCompany path="company" />
            <EmployeesOnboardingComplete path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>

          <OnboardingUserRoot path="customer">
            <CustomersOnboardingStart path="welcome" />
            <BrandPersonalPage path="personal" />
            <BrandAddressPage path="address" />
            <CustomersOnboardingComplete path="finish" />
            <Redirect default from="/" noThrow to="/dashboard/home/error404" />
          </OnboardingUserRoot>
        </PrivateRoute>
        <PrivateRoute as={HomePage} path="home">
          <UserProfile path="/user-profile" />
          <UserProfile path="/user-profile/edit" />
          <UserProfile path="/user-profile/password" />
          <UserProfile path="/user-profile/privacy-and-security" />
          <UserProfile path="/user-profile/notification" />
          <UserProfile path="/user-profile/localization" />
          <CompanyProfile path="/company-profile" />
          <EngineeringInProcess path="/in-progress" />
          <Error path="error" />
          <Error404 path="error404" />
          <Redirect default from="/" noThrow to="/dashboard/home/error404" />
        </PrivateRoute>
      </Dashboard>
    </Router>
  )
}
