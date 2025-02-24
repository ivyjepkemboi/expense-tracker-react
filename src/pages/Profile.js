import React from "react";
import Card from "../components/Card";
import avatar from "../assets/img/avatars/avatar11.png";
import banner from "../assets/img/profile/banner.png";

const Profile = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Profile Overview</h1>

      {/* Profile Banner */}
      <Card extra="flex flex-col items-center p-5">
        <div
          className="w-full h-32 bg-cover rounded-xl"
          style={{ backgroundImage: `url(${banner})` }}
        />
        <div className="-mt-10 w-20 h-20 border-4 border-white rounded-full overflow-hidden">
          <img src={avatar} alt="Profile" className="w-full h-full" />
        </div>
        <h2 className="text-xl font-bold mt-3">Adela Parkson</h2>
        <p className="text-gray-600">Product Manager</p>
      </Card>

      {/* General Information */}
      <Card extra="mt-5 p-5">
        <h3 className="text-lg font-bold mb-3">General Information</h3>
        <p className="text-gray-600">
          As we live, our hearts turn colder. Cause pain is what we go through
          as we become older...
        </p>

        {/* Profile Details */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <ProfileDetail label="Education" value="Stanford University" />
          <ProfileDetail label="Languages" value="English, Spanish" />
          <ProfileDetail label="Department" value="Product Design" />
          <ProfileDetail label="Organization" value="Simmmple Web LLC" />
          <ProfileDetail label="Work History" value="5+ Years" />
          <ProfileDetail label="Birthday" value="20 July 1986" />
        </div>
      </Card>

      {/* Notification Settings */}
      <Card extra="mt-5 p-5">
        <h3 className="text-lg font-bold mb-3">Notifications</h3>
        <NotificationOption label="Item comment notifications" />
        <NotificationOption label="Buyer review notifications" />
        <NotificationOption label="Rating reminders notifications" />
        <NotificationOption label="Meetups near you notifications" />
        <NotificationOption label="Subscribe to newsletter" />
      </Card>
    </div>
  );
};

/* Reusable Profile Detail */
const ProfileDetail = ({ label, value }) => (
  <div className="p-3 bg-gray-100 rounded-lg">
    <p className="text-sm text-gray-600">{label}</p>
    <p className="text-base font-semibold">{value}</p>
  </div>
);

/* Reusable Notification Toggle */
const NotificationOption = ({ label }) => (
  <div className="flex items-center justify-between mt-3">
    <p className="text-gray-600">{label}</p>
    <input type="checkbox" className="cursor-pointer" />
  </div>
);

export default Profile;
