import { Box, BriefcaseBusiness, DollarSign, LogIn, MessageCircle, Notebook, User } from "lucide-react";


export const account = [

    {
      icon:Box ,
      title: 'Your Orders',
      label: 'Track, return, cancel orders, download invoices, or buy again',
      url:"/orders"
    },
    {
      icon:LogIn ,
      title: 'Login & Security',
      label: 'Edit login, name, and mobile number',
      url:"/login"
    },
    // {
    //   icon:Pri,
    //   title: 'Prime',
    //   label: 'Manage your membership, view benefits, and payment settings',
    //   url:"#"
    // },
    {
      icon: Notebook,
      title: 'Your Addresses',
      label: 'Edit, remove, or set default address',
      url:"/address"
    },
    {
      icon: BriefcaseBusiness,
      title: 'Your Business Account',
      label: 'Sign up for free to save with business-exclusive pricing and schedule fast deliveries to business-hours',
      url:"/business"
    },
    {
      icon: DollarSign,
      title: 'Your Payments',
      label: 'View all transactions, manage payment methods and settings',
      url:"/payments"
    },
    {
      icon: User,
      title: 'Your Profiles',
      label: 'Manage, add, or remove user profiles for personalized experiences',
      url:"/profiles"
    },
    {
      icon: MessageCircle,
      title: 'Your Reviews',
      label: 'View or respond to messages from Amazon, Sellers, and Buyers',
      url:"/messages"
    },
  ];
  