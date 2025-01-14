# 🚀 EduCareer - The Future of Learning & Career Development

EduCareer is an innovative mobile application combining the best features of LinkedIn and Instagram. Focused on education and career growth, the app empowers users to share valuable educational content (like reels and videos), apply for jobs, and build meaningful connections with professionals and like-minded individuals.

We are currently in **production** and working hard to launch soon! Stay tuned for an exciting platform that will revolutionize the way we learn and grow in our careers.

## 🌟 Features

### 1. **Seamless User Registration & Authentication**

- **User authentication powered by [Clerk](https://clerk.dev/)**: Secure login and registration using modern authentication features like email/password, social logins (Google, GitHub), and more.
- Enjoy **fast and secure sessions** with Clerk’s authentication system.
- Profile management to keep your account updated and personalized.

### 2. **Share Educational Content**

- Upload and share **educational reels/videos** covering topics like technology, personal development, career tips, and more.
- Content is filtered and curated to ensure it's valuable and relevant to the learning community.

### 3. **Job Application System**

- Browse job posts tailored to your skills and interests.
- Apply directly to job opportunities, and track the status of your applications (pending, accepted, rejected).
- Filter job posts by location, industry, and position for easy navigation.

### 4. **Post Interactions & Engagement**

- Like, comment, and share posts to engage with content that resonates with you.
- Follow users whose content and career insights you find valuable.
- Build your professional network by engaging with educational content.

### 5. **Personalized Content Feed**

- Enjoy a customized feed tailored to your **interests** and **preferences**.
- Get content suggestions based on your **liked posts** and **followed users**.
- Stay updated with the latest educational content from your network and the community.

### 6. **Content Moderation**

- Posts are carefully filtered to ensure they meet our educational standards.
- Report inappropriate content to help maintain a positive and informative environment.

## 🛠️ Tech Stack

- **Frontend**: React Native (for mobile app development)
- **Backend**: Node.js + Express.js (robust and scalable API)
- **Database**: MongoDB (for secure and efficient data storage)
- **Authentication**: **Clerk** for secure and seamless user authentication (email/password, OAuth providers like Google, GitHub)
- **File Storage**: AWS S3 or Firebase (for storing videos and media)
- **Job Management**: MongoDB with references to job posts and user applications
- **Content Filtering**: Algorithms to filter relevant educational content

## 🔧 Setup Guide

### Prerequisites

Before you start, ensure you have the following installed:

- **Node.js** (v14 or later)
- **MongoDB** (local or cloud instance like MongoDB Atlas)
- **Expo CLI** (for mobile app development)
- **Clerk Account**: Set up your Clerk account to get your API keys for authentication.

### Backend Setup

1. Clone the repository:

```bash
git clone https://github.com/yourusername/edu-career-app.git
cd edu-career-app
```

2. Install backend dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a .env file in the root directory and add necessary environment variables:

```bash
CLERK_API_KEY=your_clerk_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:

```bash
npm run start
```

### Mobile App Setup

1. Clone the repository (if not already done):

```bash
git clone https://github.com/yourusername/edu-career-app.git
cd edu-career-app
```

2. Install frontend dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npx expo start
```

4. Scan the QR code using the Expo Go app on your mobile device or run on an emulator.

## 📱 Usage

- **Register/Log in:** Create a new account or log in using Clerk's secure authentication system. You can register with your email or use OAuth logins like Google or GitHub.
- **Share Educational Content:** Upload your own educational videos or reels and engage with others' posts.
- **Apply for Jobs:** Browse job opportunities that match your skills, interests, and career goals.
- **Interact with Content:** Like, comment, and share posts that you find valuable.
- **Personalized Feed:** Receive content suggestions based on your preferences and interactions.

## 💡 Contributing

### We welcome contributions to this project! If you'd like to help improve EduCareer, here's how you can get involved:

1. **Fork the repository:**
   - Navigate to the repository you want to fork on GitHub.
   - Click the Fork button at the top-right corner of the page.
   - Once forked, you can clone your forked repository to your local machine.
2. **Create a new branch:**

```bash
git checkout -b feature-name
```

- Replace feature-name with a descriptive name for your feature.

3. **Commit your changes:**

```bash
git commit -m "Add new feature"
```

-Use a descriptive message for your commit explaining the changes you made. 4. **Push the changes to your branch:**

```bash
git push origin feature-name
```

- This will push your changes to the branch feature-name on your forked repository.

5. **Create a pull request:**
   - Go to the original repository on GitHub.
   - You should see a prompt to create a pull request with your branch.

## 🤝 Acknowledgements

- **Clerk:** For authentication and user management.
- **React Native:** For building the mobile app.
- **Node.js & Express.js:** For backend development.
- **MongoDB:** For data storage and management.
- **AWS S3 / Firebase:** For video storage.

---

**Thank you for supporting EduCareer — your gateway to personal growth and career success!**
