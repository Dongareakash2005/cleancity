import React, { useState, useEffect } from 'react';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { LoadingScreen } from './components/LoadingScreen';
import { PostLocationLoadingScreen } from './components/PostLocationLoadingScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { HomeScreen } from './components/HomeScreen';
import { ReportScreen } from './components/ReportScreen';
import { LeafletMapScreen } from './components/LeafletMapScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { translations, Language } from './components/translations';

export interface Report {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  media?: MediaItem[];
  district: string;
  ward: string;
  street: string;
  coordinates: { lat: number; lng: number };
  distance: number;
  timestamp: Date;
  aiTag: string;
  aiConfidence: number;
  status: 'pending' | 'acknowledged' | 'submitted' | 'resolved';
  upvotes: number;
  comments: Comment[];
  severity: number;
  type: string;
  userId?: string;
  hasUserUpvoted?: boolean;
  isTamperDetected?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export interface Comment {
  id: string;
  text: string;
  timestamp: Date;
  author: string;
}

export interface User {
  district: string;
  coordinates: { lat: number; lng: number };
  language: Language;
  isOnline: boolean;
}

export type Screen = 'onboarding' | 'home' | 'report' | 'map' | 'profile' | 'analytics';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPostLocationLoading, setIsPostLocationLoading] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [user, setUser] = useState<User>({
    district: 'Siliguri',
    coordinates: { lat: 26.7271, lng: 88.3953 },
    language: 'english',
    isOnline: true,
  });
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const initialReports: Report[] = [
      {
        id: '1',
        title: 'Major pothole on Hill Cart Road',
        description: 'Deep pothole near Mahabirsthan causing traffic disruption and vehicle damage.',
        imageUrl: 'https://www.transpoco.com/hubfs/the_pothole_problem_1%2C000%2C000%20reports%20every%20year%20(one%20every%20two%20minutes).png?w=400',
        district: 'Siliguri',
        ward: 'Ward 12 - Mahabirsthan',
        street: 'Hill Cart Road',
        coordinates: { lat: 26.7271, lng: 88.3953 },
        distance: 0.3,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        aiTag: 'Road Infrastructure',
        aiConfidence: 94,
        status: 'pending',
        upvotes: 47,
        comments: [
          { id: '1', text: 'This is causing major traffic jams daily!', timestamp: new Date(), author: 'Rajesh Kumar' },
          { id: '2', text: 'My car tire got damaged here yesterday', timestamp: new Date(), author: 'Priya Singh' },
        ],
        severity: 9,
        type: 'road',
        hasUserUpvoted: false,
        priority: 'high',
      },
      {
        id: '2',
        title: 'Garbage overflow at Hong Kong Market',
        description: 'Garbage bins overflowing at market area and creating hygiene risk.',
        imageUrl: 'https://i.pinimg.com/736x/80/f3/96/80f3960217c48c2f1a8eda45ff5da35b.jpg?w=400',
        district: 'Siliguri',
        ward: 'Ward 18 - Hong Kong Market',
        street: 'Sevoke Road',
        coordinates: { lat: 26.7135, lng: 88.4013 },
        distance: 1.2,
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        aiTag: 'Waste Management',
        aiConfidence: 91,
        status: 'submitted',
        upvotes: 23,
        comments: [{ id: '4', text: 'Health department should inspect this', timestamp: new Date(), author: 'Dr. Anita Devi' }],
        severity: 7,
        type: 'garbage',
        hasUserUpvoted: false,
        priority: 'medium',
      },
      {
        id: '3',
        title: 'Street light not working - Pradhan Nagar',
        description: 'Street light pole damaged near main road and area becomes unsafe after dark.',
        imageUrl: 'https://i.pinimg.com/1200x/f4/c0/5c/f4c05c75472d231f783af9b203cc2ec0.jpg?w=400&h=300',
        district: 'Siliguri',
        ward: 'Ward 8 - Pradhan Nagar',
        street: 'Pradhan Nagar Main Road',
        coordinates: { lat: 26.7389, lng: 88.4115 },
        distance: 2.1,
        timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
        aiTag: 'Street Lighting',
        aiConfidence: 96,
        status: 'resolved',
        upvotes: 15,
        comments: [{ id: '6', text: 'Fixed! Thank you team', timestamp: new Date(), author: 'Suresh Mahato' }],
        severity: 6,
        type: 'streetlight',
        hasUserUpvoted: false,
        priority: 'low',
      },
      {
        id: '4',
        title: 'Water supply disruption in Dagapur',
        description: 'No water supply for 3 days in Dagapur residential area.',
        imageUrl: 'https://i.pinimg.com/1200x/1f/fe/4b/1ffe4b43e9dd07dda46f73aa463883e9.jpg?w=400',
        district: 'Siliguri',
        ward: 'Ward 25 - Dagapur',
        street: 'Dagapur Main Road',
        coordinates: { lat: 26.7089, lng: 88.3789 },
        distance: 3.2,
        timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
        aiTag: 'Water Supply',
        aiConfidence: 89,
        status: 'submitted',
        upvotes: 67,
        comments: [{ id: '7', text: 'Please urgently restore water supply!', timestamp: new Date(), author: 'Meera Gupta' }],
        severity: 10,
        type: 'water',
        hasUserUpvoted: true,
        priority: 'high',
      },
      {
        id: '5',
        title: 'Drainage blockage at Siliguri Junction',
        description: 'Main drainage blocked and causing water logging during rain.',
        imageUrl: 'https://i.pinimg.com/1200x/2b/79/8c/2b798c30e78d360375daafa709d68270.jpg?w=400',
        district: 'Siliguri',
        ward: 'Ward 15 - Siliguri Junction',
        street: 'Junction Road',
        coordinates: { lat: 26.7205, lng: 88.3885 },
        distance: 1.8,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        aiTag: 'Drainage System',
        aiConfidence: 87,
        status: 'pending',
        upvotes: 34,
        comments: [{ id: '10', text: 'Need immediate action', timestamp: new Date(), author: 'Sita Devi' }],
        severity: 8,
        type: 'drainage',
        hasUserUpvoted: false,
        priority: 'high',
      },
    ];
    setReports(initialReports);
  }, []);

  const handleCompleteOnboarding = (selectedDistrict: string, coords: { lat: number; lng: number }, language: Language) => {
    setUser((prev) => ({
      ...prev,
      district: selectedDistrict,
      coordinates: coords,
      language,
    }));

    setIsPostLocationLoading(true);
    setTimeout(() => {
      setIsPostLocationLoading(false);
      setHasCompletedOnboarding(true);
      setCurrentScreen('home');
    }, 900);
  };

  const handleAddReport = (newReport: Omit<Report, 'id' | 'timestamp' | 'upvotes' | 'comments' | 'distance' | 'hasUserUpvoted'>) => {
    const report: Report = {
      ...newReport,
      id: Date.now().toString(),
      timestamp: new Date(),
      upvotes: 0,
      comments: [],
      distance: 0,
      hasUserUpvoted: false,
    };

    setReports((prev) => [report, ...prev]);
    toast.success(translations[user.language].reportSubmitted, {
      description: `Report #${report.id.slice(-4)} has been added to the feed`,
      duration: 3000,
    });
    setCurrentScreen('home');
  };

  const handleUpvote = (reportId: string) => {
    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const hasUpvoted = report.hasUserUpvoted;
          return {
            ...report,
            upvotes: hasUpvoted ? report.upvotes - 1 : report.upvotes + 1,
            hasUserUpvoted: !hasUpvoted,
          };
        }
        return report;
      }),
    );
  };

  const handleAddComment = (reportId: string, commentText: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      text: commentText,
      timestamp: new Date(),
      author: 'You',
    };

    setReports((prev) =>
      prev.map((report) => {
        if (report.id === reportId) {
          const updatedReport = {
            ...report,
            comments: [...report.comments, newComment],
          };

          if (selectedReport && selectedReport.id === reportId) {
            setSelectedReport(updatedReport);
          }

          return updatedReport;
        }
        return report;
      }),
    );
  };

  const handleLanguageChange = (language: Language) => {
    setUser((prev) => ({ ...prev, language }));
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isPostLocationLoading) {
    return <PostLocationLoadingScreen detectedLocation={user.district} />;
  }

  if (!hasCompletedOnboarding) {
    return (
      <div className="min-h-screen bg-background w-full mx-auto relative">
        <OnboardingScreen
          onComplete={handleCompleteOnboarding}
          currentLanguage={user.language}
          onLanguageChange={handleLanguageChange}
        />
        <Toaster />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background w-full mx-auto relative">
      {currentScreen !== 'map' && (
        <div className="pb-20">
          {currentScreen === 'home' && (
            <HomeScreen
              reports={reports}
              user={user}
              onReportSelect={setSelectedReport}
              onUpvote={handleUpvote}
              onAddComment={handleAddComment}
              selectedReport={selectedReport}
              onCloseModal={() => setSelectedReport(null)}
              onReportAgain={() => setCurrentScreen('report')}
            />
          )}

          {currentScreen === 'analytics' && <AnalyticsScreen reports={reports} user={user} />}

          {currentScreen === 'report' && (
            <ReportScreen user={user} onSubmit={handleAddReport} onCancel={() => setCurrentScreen('home')} />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              reports={reports.filter((r) => r.userId === 'current-user')}
              user={user}
              onLanguageChange={handleLanguageChange}
              onToggleOnline={() => setUser((prev) => ({ ...prev, isOnline: !prev.isOnline }))}
              onReportAgain={() => setCurrentScreen('report')}
            />
          )}
        </div>
      )}

      {currentScreen === 'map' && (
        <LeafletMapScreen reports={reports} user={user} onReportSelect={setSelectedReport} onUpvote={handleUpvote} />
      )}

      <BottomNavigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} language={user.language} />
      <Toaster />
    </div>
  );
}
