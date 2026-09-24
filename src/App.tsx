import { useState } from 'react'
import Splash from './screens/Splash'
import Onboarding from './screens/Onboarding'
import RoleSelect from './screens/RoleSelect'
import StudentLogin from './screens/StudentLogin'
import ProfileSetup from './screens/ProfileSetup'
import ABIntro from './screens/ABIntro'
import ABQuestion from './screens/ABQuestion'
import PreferenceResult from './screens/PreferenceResult'
import StudentHome from './screens/StudentHome'
import MissionExplore from './screens/MissionExplore'
import MissionDetail from './screens/MissionDetail'
import MissionTrial from './screens/MissionTrial'
import Reflection from './screens/Reflection'
import UpdatedResult from './screens/UpdatedResult'
import CompanyMatch from './screens/CompanyMatch'
import StudentProfile from './screens/StudentProfile'
import ScoutInbox from './screens/ScoutInbox'
import CareerPassport from './screens/CareerPassport'
import TrialEvaluation from './screens/TrialEvaluation'
import CompanyLogin from './screens/company/CompanyLogin'
import CompanyDashboard from './screens/company/CompanyDashboard'
import MissionList from './screens/company/MissionList'
import CreateMission from './screens/company/CreateMission'
import MissionAnalytics from './screens/company/MissionAnalytics'
import StudentList from './screens/company/StudentList'
import StudentDetail from './screens/company/StudentDetail'
import ScoutManagement from './screens/company/ScoutManagement'
import ScoutCompose from './screens/company/ScoutCompose'

export type Screen =
  | 'splash' | 'onboarding' | 'roleSelect'
  | 'studentLogin' | 'profileSetup' | 'abIntro' | 'abQuestion' | 'preferenceResult'
  | 'studentHome' | 'missionExplore' | 'missionDetail' | 'missionTrial'
  | 'reflection' | 'updatedResult' | 'companyMatch' | 'scoutInbox' | 'studentProfile' | 'careerPassport'
  | 'trialEvaluation'
  | 'companyLogin' | 'companyDashboard' | 'missionList' | 'createMission'
  | 'missionAnalytics' | 'studentList' | 'studentDetail' | 'companyScouts' | 'scoutCompose'

export type NavParams = { missionId?: string; studentId?: string; companyScreen?: string }

export default function App() {
  const [screen, setScreen] = useState<Screen>('splash')
  const [params, setParams] = useState<NavParams>({})
  const [abAnswers, setAbAnswers] = useState<('a' | 'b')[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)

  const navigate = (s: Screen, p?: NavParams) => {
    setScreen(s)
    if (p) setParams(p)
    window.scrollTo(0, 0)
  }

  const isCompany = ['companyLogin', 'companyDashboard', 'missionList', 'createMission', 'missionAnalytics', 'studentList', 'studentDetail', 'companyScouts', 'scoutCompose'].includes(screen)
  const bgClass = isCompany ? 'bg-gray-50' : 'bg-[#F7F6FF] min-h-screen'

  const renderScreen = () => {
    switch (screen) {
      case 'splash': return <Splash navigate={navigate} />
      case 'onboarding': return <Onboarding navigate={navigate} />
      case 'roleSelect': return <RoleSelect navigate={navigate} />
      case 'studentLogin': return <StudentLogin navigate={navigate} />
      case 'profileSetup': return <ProfileSetup navigate={navigate} />
      case 'abIntro': return <ABIntro navigate={navigate} />
      case 'abQuestion': return (
        <ABQuestion
          navigate={navigate}
          questionIndex={currentQuestion}
          answers={abAnswers}
          setAnswers={setAbAnswers}
          setQuestionIndex={setCurrentQuestion}
        />
      )
      case 'preferenceResult': return <PreferenceResult navigate={navigate} answers={abAnswers} />
      case 'studentHome': return <StudentHome navigate={navigate} />
      case 'missionExplore': return <MissionExplore navigate={navigate} />
      case 'missionDetail': return <MissionDetail navigate={navigate} missionId={params.missionId} />
      case 'missionTrial': return <MissionTrial navigate={navigate} missionId={params.missionId} />
      case 'reflection': return <Reflection navigate={navigate} missionId={params.missionId} />
      case 'updatedResult': return <UpdatedResult navigate={navigate} />
      case 'companyMatch': return <CompanyMatch navigate={navigate} />
      case 'scoutInbox': return <ScoutInbox navigate={navigate} />
      case 'studentProfile': return <StudentProfile navigate={navigate} />
      case 'careerPassport': return <CareerPassport navigate={navigate} />
      case 'trialEvaluation': return <TrialEvaluation navigate={navigate} />
      case 'companyLogin': return <CompanyLogin navigate={navigate} />
      case 'companyDashboard': return <CompanyDashboard navigate={navigate} />
      case 'missionList': return <MissionList navigate={navigate} />
      case 'createMission': return <CreateMission navigate={navigate} />
      case 'missionAnalytics': return <MissionAnalytics navigate={navigate} />
      case 'studentList': return <StudentList navigate={navigate} />
      case 'studentDetail': return <StudentDetail navigate={navigate} studentId={params.studentId} />
      case 'companyScouts': return <ScoutManagement navigate={navigate} />
      case 'scoutCompose': return <ScoutCompose navigate={navigate} studentId={params.studentId} />
      default: return <Splash navigate={navigate} />
    }
  }

  if (screen === 'splash') {
    return <div className="min-h-screen">{renderScreen()}</div>
  }

  if (isCompany) {
    return <div className="min-h-screen bg-gray-50">{renderScreen()}</div>
  }

  const isPreAuth = ['onboarding', 'roleSelect', 'studentLogin', 'profileSetup', 'abIntro', 'abQuestion', 'preferenceResult'].includes(screen)

  if (isPreAuth) {
    return (
      <div className="min-h-screen bg-[#F7F8FB]">
        {renderScreen()}
      </div>
    )
  }

  return <div className={`min-h-screen ${bgClass}`}>{renderScreen()}</div>
}
