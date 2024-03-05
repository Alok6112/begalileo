import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/login';
import Splash from '../screens/splash';
import ParentProfile from '../screens/parent_profile';
import AddKidDetail from '../screens/add_kid_detail';
import RateDemoClass from '../screens/BookDemoScreen/rate_demo_class';
import FaqScreen from '../screens/AppScreens/faq_screen';
import Dashboard from '../screens/AppScreens/dashboard';
import HomeReportScreen from '../screens/AppScreens/HomeReportScreen';
import BookDemoScreen from '../screens/BookDemoScreen/book_demo_screen';
import DemoConfirmation from '../screens/BookDemoScreen/demo_confirmation';
import TeacherProfile from '../screens/BookDemoScreen/teacher_profile';
import ViewCurriculum from '../screens/AppScreens/view_curriculum';
import CartListScreen from '../screens/CartScreen/cart_screen';
import CartAddress from '../screens/CartScreen/cart_address';
import AddAddress from '../screens/CartScreen/add_address';
import PaymentSuccessScreen from '../screens/PaymentScreens/payment_success_screen';
import PaymentFailedScreen from '../screens/PaymentScreens/payment_failed_screen';
import ChooseLiveBatch from '../screens/BatchScreens/choose_live_batch';
import PreferLiveBatchScreen from '../screens/BatchScreens/prefer_live_batch';
import MoreProfileScreen from '../screens/MoreScreens/more_profile_screen';
import MoreEditProfileScreen from '../screens/MoreScreens/more_edit_profile_screen';
import OverallActivitiesScreen from '../screens/ReportScreens/OverallActivitiesScreen';
import ActivityReportScreen from '../screens/ReportScreens/ActivityReportScreen';
import StarBadgeReportScreen from '../screens/ReportScreens/StarBadgeReportScreen';
import MoreLiveClassBatchScreens from '../screens/MoreScreens/more_live_class_batch_screes';
import MoreMySubscriptions from '../screens/MoreScreens/more_my_subcriptions';
import SubscriptonDetailsScreen from '../screens/SubscriptionScreens/SubscriptonDetailsScreen';
import SubscriptonOrderDetails from '../screens/SubscriptionScreens/SubscriptonOrderDetails';
import SubscriptonMathboxDetails from '../screens/SubscriptionScreens/SubscriptonMathboxDetails';
import MoreMyAddressScreen from '../screens/MoreScreens/more_my_address_screen';
import MoreHelpScreen from '../screens/MoreScreens/more_help_screen';
import EditKidDetail from '../screens/MyKids/EditKidDetail';
import MainScreen from '../screens/AppScreens/MainScreen';
import TeacherLoginScreen from '../screens/AppScreens/TeacherLoginScreen';
import DemoDetails from '../screens/BookDemoScreen/demo_details';
import DemoClassResults from '../screens/BookDemoScreen/demo_class_results';
import RenewSubscription from '../screens/SubscriptionScreens/RenewSubscription';
import ShowSubscriptions from '../screens/SubscriptionScreens/ShowSubscriptions';
import ClassDetailsScreen from '../screens/ScheduleScreens/ClassDetailsScreen';
import ClassListScreen from '../screens/ScheduleScreens/ClassListScreen';
import LiveClassSchedule from '../screens/ScheduleScreens/LiveClassSchedule';
import MoreNotificationScreen from '../screens/MoreScreens/more_notification_screen';
import ParentConnect from '../screens/ParentPeakScreen/ParentConnect';
import JoinLiveClassButton from '../screens/JoinLiveClassChildScreen/Components/App/JoinLiveClassButton';
import VideoRoom from '../screens/JoinLiveClassChildScreen/Components/VideoRoom/VideoRoom';
import VideoTemp from '../screens/JoinLiveClassChildScreen/Components/VideoRoom/VideoTemp';
import ScratchWebView from '../screens/JoinLiveClassChildScreen/Components/Scratch/ScratchWebView';
import MidasHomeScreen from '../screens/MidasTest/MidasHomeScreen';
import PostOtpBookDemo from '../screens/PostOtpBookDemo';
import BookDemoScreenPostOtp from '../screens/BookDemoScreen/book_demo_screen_post_otp';
import BookDemoScreenPostChild from '../screens/BookDemoScreen/book_demo_screen_post_child';
import SpeedMathHome from '../screens/SpeedMath/SpeedMathHome';
import SpeedMathPlay from '../screens/SpeedMath/SpeedMathPlay';
import EmotionDisplay from '../screens/EmotionScreens/EmotionDisplay';
import ViewRecording from '../screens/ViewRecordingScreen/ViewRecording';
import MathZoneHome from '../screens/MathZoneScreens/MathZoneHome';
import MathZoneQuiz from '../screens/MathZoneScreens/MathZoneQuiz';
import TrainingProgramHomeScreen from '../screens/TrainingProgramScreens/TrainingProgramHomeScreen';
import TrainingProgramHomeScreenWeek from '../screens/TrainingProgramScreens/TrainingProgramWeekScreen';
import TrainingProgramVideoUploadChat from '../screens/TrainingProgramScreens/TrainingProgramVideoUploadChat';
import TrainingProgramGallery from '../screens/TrainingProgramScreens/TrainingProgramWeekGallery';
import TrainingProgramVideoNotification from '../screens/TrainingProgramScreens/TrainingProgramVideoNotification';
import StudentWeekData from '../screens/TeacherDashboard/StudentWeekData';
import StudentChatData from '../screens/TeacherDashboard/StudentChats';
import RenewSubscriptionChildPreview from '../screens/SubscriptionScreens/RenewSubscriptionChildPreview';
import SmDashBoard from '../screens/SmScreen/SmDashBoard';
import SignUp from '../screens/SmScreen/AppChat/Screens/SignUpScreen';
import ChatScreen from '../screens/SmScreen/AppChat/Screens/ChatScreen';
import ChatDashBoard from '../screens/SmScreen/AppChat/Screens/DashboardScreen';

const Stack = createNativeStackNavigator();
function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" component={Splash}>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ParentProfile"
          component={ParentProfile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="CartAddress"
          component={CartAddress}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MathZoneHome"
          component={MathZoneHome}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MathZoneQuiz"
          component={MathZoneQuiz}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TrainingProgramHomeScreen"
          component={TrainingProgramHomeScreen}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TrainingProgramHomeScreenWeek"
          component={TrainingProgramHomeScreenWeek}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TrainingProgramVideoUploadChat"
          component={TrainingProgramVideoUploadChat}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TrainingProgramGallery"
          component={TrainingProgramGallery}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TrainingProgramVideoNotification"
          component={TrainingProgramVideoNotification}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="StudentWeekData"
          component={StudentWeekData}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="StudentChatData"
          component={StudentChatData}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="AddKidDetail"
          component={AddKidDetail}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="EditKidDetail"
          component={EditKidDetail}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BookDemoScreen"
          component={BookDemoScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BookDemoScreenPostOtp"
          component={BookDemoScreenPostOtp}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="RateDemoClass"
          component={RateDemoClass}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="EmotionDisplay"
          component={EmotionDisplay}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="DemoClassResults"
          component={DemoClassResults}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ParentConnect"
          component={ParentConnect}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="VideoRoom"
          component={VideoRoom}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="VideoTemp"
          component={VideoTemp}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ScratchWebView"
          component={ScratchWebView}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MidasHomeScreen"
          component={MidasHomeScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SpeedMathHome"
          component={SpeedMathHome}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SpeedMathPlay"
          component={SpeedMathPlay}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PaymentFailedScreen"
          component={PaymentFailedScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PaymentSuccessScreen"
          component={PaymentSuccessScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PostOtpBookDemo"
          component={PostOtpBookDemo}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TeacherLoginScreen"
          component={TeacherLoginScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="HomeReportScreen"
          component={HomeReportScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreMyAddressScreen"
          component={MoreMyAddressScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreNotificationScreen"
          component={MoreNotificationScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreHelpScreen"
          component={MoreHelpScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SubscriptonDetailsScreen"
          component={SubscriptonDetailsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SubscriptonOrderDetails"
          component={SubscriptonOrderDetails}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SubscriptonMathboxDetails"
          component={SubscriptonMathboxDetails}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreMySubscriptions"
          component={MoreMySubscriptions}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="OverallActivitiesScreen"
          component={OverallActivitiesScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ActivityReportScreen"
          component={ActivityReportScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreLiveClassBatchScreens"
          component={MoreLiveClassBatchScreens}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="StarBadgeReportScreen"
          component={StarBadgeReportScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreEditProfileScreen"
          component={MoreEditProfileScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="RenewSubscription"
          component={RenewSubscription}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="RenewSubscriptionChildPreview"
          component={RenewSubscriptionChildPreview}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ShowSubscriptions"
          component={ShowSubscriptions}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ViewRecording"
          component={ViewRecording}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ClassDetailsScreen"
          component={ClassDetailsScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ClassListScreen"
          component={ClassListScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="LiveClassSchedule"
          component={LiveClassSchedule}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ChooseLiveBatch"
          component={ChooseLiveBatch}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="PreferLiveBatchScreen"
          component={PreferLiveBatchScreen}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />

        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ViewCurriculum"
          component={ViewCurriculum}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="CartListScreen"
          component={CartListScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="DemoConfirmation"
          component={DemoConfirmation}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="DemoDetails"
          component={DemoDetails}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="TeacherProfile"
          component={TeacherProfile}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ChatDashBoard"
          component={ChatDashBoard}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="FaqScreen"
          component={FaqScreen}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="MoreProfileScreen"
          component={MoreProfileScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SmDashBoard"
          component={SmDashBoard}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="JoinLiveClassButton"
          component={JoinLiveClassButton}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="BookDemoScreenPostChild"
          component={BookDemoScreenPostChild}
          options={{
            headerShown: false,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: true,
            gestureEnabled: false,
            headerBackTitleVisible: false,
            headerTitle: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppStack;
