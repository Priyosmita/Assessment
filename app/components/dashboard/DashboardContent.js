"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSend, IoMdMore } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineClose, AiOutlineEllipsis } from "react-icons/ai";
import { FaRegEnvelope } from "react-icons/fa";
import { LuMailOpen } from "react-icons/lu";
import { FaReply } from "react-icons/fa";


const emailData = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    title: "Meeting Follow-up",
    from: "john.doe@example.com",
    to: "you@example.com",
    body: "Regarding our latest meeting, please find the follow-up details attached.",
    preview: "Regarding our latest meeting...",
    date: "Aug 8",
    status: "Interested",
    replies: [
      {
        from: "you@example.com",
        to: "john.doe@example.com",
        body: "Thank you, John. I'll review the follow-up details.",
        date: "Aug 9",
      },
      {
        from: "john.doe@example.com",
        to: "you@example.com",
        body: "Please let me know if you have any questions.",
        date: "Aug 10",
      },
    ],
    lead: [
      {
        name: "John",
        contact: "+913456345678",
        email: "john.doe@example.com",
        linkedIn: "linkedin.in/in/johndoe",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    title: "Discussion Recap",
    from: "jane.smith@example.com",
    to: "you@example.com",
    body: "Follow-up on the last discussion, including action items.",
    preview: "Follow-up on the last discussion...",
    date: "Aug 7",
    status: "Closed",
    replies: [
      {
        from: "you@example.com",
        to: "jane.smith@example.com",
        body: "Thanks for the recap, Jane. I'll start working on the action items.",
        date: "Aug 8",
      },
    ],
    lead: [
      {
        name: "Jane",
        contact: "+912345678910",
        email: "jane.smith@example.com",
        linkedIn: "linkedin.in/in/janesmith",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Info Tech",
    email: "info@company.com",
    title: "Campaign Details",
    from: "info@company.com",
    to: "you@example.com",
    body: "New campaign details inside, including schedules and promotional material.",
    preview: "New campaign details inside...",
    date: "Aug 5",
    status: "Meeting Booked",
    replies: [
      {
        from: "you@example.com",
        to: "info@company.com",
        body: "Got it. I'll review the materials and get back to you if needed.",
        date: "Aug 6",
      },
    ],
    lead: [
      {
        name: "Info",
        contact: "+911234567890",
        email: "info@company.com",
        linkedIn: "linkedin.in/in/infotech",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Support",
    email: "support@helpdesk.com",
    title: "Issue Resolved",
    from: "support@helpdesk.com",
    to: "you@example.com",
    body: "Your issue has been resolved. Please review the attached resolution document.",
    preview: "Your issue has been resolved...",
    date: "Aug 4",
    status: "Meeting Completed",
    replies: [
      {
        from: "you@example.com",
        to: "support@helpdesk.com",
        body: "Thanks for the quick resolution. I'll review the document.",
        date: "Aug 5",
      },
      {
        from: "support@helpdesk.com",
        to: "you@example.com",
        body: "Let us know if you need any further assistance.",
        date: "Aug 6",
      },
    ],
    lead: [
      {
        name: "Support",
        contact: "+919876543210",
        email: "support@helpdesk.com",
        linkedIn: "linkedin.in/in/supportteam",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Market",
    email: "marketing@agency.com",
    title: "Q3 Marketing Trends",
    from: "marketing@agency.com",
    to: "you@example.com",
    body: "Latest marketing trends for Q3, including insights and forecasts.",
    preview: "Latest marketing trends for Q3...",
    date: "Aug 3",
    status: "Interested",
    replies: [
      {
        from: "you@example.com",
        to: "marketing@agency.com",
        body: "Interesting insights! I'll dive deeper into these trends.",
        date: "Aug 4",
      },
    ],
    lead: [
      {
        name: "Market",
        contact: "+914567890123",
        email: "marketing@agency.com",
        linkedIn: "linkedin.in/in/marketingspecialist",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Alice Brown",
    email: "alice.brown@startup.com",
    title: "Investment Proposal",
    from: "alice.brown@startup.com",
    to: "you@example.com",
    body: "We are looking for investors for our new project. Attached is our proposal.",
    preview: "We are looking for investors...",
    date: "Aug 2",
    status: "Interested",
    replies: [
      {
        from: "you@example.com",
        to: "alice.brown@startup.com",
        body: "Thanks, Alice. I'll review the proposal and get back to you.",
        date: "Aug 3",
      },
    ],
    lead: [
      {
        name: "Alice",
        contact: "+918765432109",
        email: "alice.brown@startup.com",
        linkedIn: "linkedin.in/in/alicebrown",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Bob Carter",
    email: "bob.carter@fintech.com",
    title: "Financial Update",
    from: "bob.carter@fintech.com",
    to: "you@example.com",
    body: "Here’s the latest financial update for Q2.",
    preview: "Here’s the latest financial update...",
    date: "Aug 1",
    status: "Meeting Completed",
    replies: [
      {
        from: "you@example.com",
        to: "bob.carter@fintech.com",
        body: "Thanks for the update, Bob. I'll review the figures.",
        date: "Aug 2",
      },
    ],
    lead: [
      {
        name: "Bob",
        contact: "+917654321098",
        email: "bob.carter@fintech.com",
        linkedIn: "linkedin.in/in/bobcarter",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "Clara Davis",
    email: "clara.davis@design.com",
    title: "Design Feedback",
    from: "clara.davis@design.com",
    to: "you@example.com",
    body: "Looking forward to your feedback on the latest design mockups.",
    preview: "Looking forward to your feedback...",
    date: "Jul 31",
    status: "Closed",
    replies: [
      {
        from: "you@example.com",
        to: "clara.davis@design.com",
        body: "Great work, Clara. I'll provide feedback by tomorrow.",
        date: "Aug 1",
      },
    ],
    lead: [
      {
        name: "Clara",
        contact: "+916543210987",
        email: "clara.davis@design.com",
        linkedIn: "linkedin.in/in/claradavis",
        company: "Reachinbox",
      },
    ],
  },
  {
    name: "David Evans",
    email: "david.evans@tech.com",
    title: "Product Launch",
    from: "david.evans@tech.com",
    to: "you@example.com",
    body: "Exciting news! Our new product launch is scheduled for next month.",
    preview: "Exciting news! Our new product...",
    date: "Jul 30",
    status: "Interested",
    replies: [
      {
        from: "you@example.com",
        to: "david.evans@tech.com",
        body: "That sounds exciting, David! I'll be looking forward to it.",
        date: "Jul 31",
      },
    ],
    lead: [
      {
        name: "David",
        contact: "+915432109876",
        email: "david.evans@tech.com",
        linkedIn: "linkedin.in/in/davidevans",
        company: "Reachinbox",
      },
    ],
  },
];


const getStatusButton = (status) => {
  let buttonText;
  let buttonColor;


  switch (status) {
    case "Interested":
      buttonText = "Interested";
      buttonColor = "text-green-500";
      break;
    case "Closed":
      buttonText = "Closed";
      buttonColor = "text-blue-700";
      break;
    case "Meeting Booked":
      buttonText = "Meeting Booked";
      buttonColor = "text-purple-500";
      break;
    case "Meeting Completed":
      buttonText = "Meeting Completed";
      buttonColor = "text-yellow-500";
      break;
    default:
      buttonText = "Interested";
      buttonColor = "text-green-500";
  }


  return (
    <button
      className={`mr-3 px-2 bg-[#1f2125] ${buttonColor} text-xs rounded-full flex items-center`}
    >
      <span className="mr-1 text-xl">●</span>
      <span className="mr-2">{buttonText}</span>
    </button>
  );
};


const DashboardContent = () => {
  const [emails, setEmails] = useState(emailData);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("Newest");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [isReplyPopupOpen, setIsReplyPopupOpen] = useState(false);


  const menuRef = useRef(null);


  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const openReplyPopup = () => {
    setIsReplyPopupOpen(true);
  };


  const filterEmails = (query, sort) => {
    const lowercasedQuery = query.toLowerCase();
    let filteredEmails = emailData.filter((email) =>
      email.email.toLowerCase().includes(lowercasedQuery)
    );


    switch (sort) {
      case "Newest":
        filteredEmails.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "Oldest":
        filteredEmails.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "Interested":
        filteredEmails = filteredEmails.filter(
          (email) => email.status === "Interested"
        );
        break;
      case "Closed":
        filteredEmails = filteredEmails.filter(
          (email) => email.status === "Closed"
        );
        break;
      case "Booked":
        filteredEmails = filteredEmails.filter(
          (email) => email.status === "Meeting Booked"
        );
        break;
      case "Completed":
        filteredEmails = filteredEmails.filter(
          (email) => email.status === "Meeting Completed"
        );
        break;
      default:
      // No additional filtering or sorting
    }


    setEmails(filteredEmails);
  };


  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    filterEmails(query, sortOption);
  };
  const handleReplyButtonClick = () => {
    setIsReplyPopupOpen(true);
  };


  const closeReplyPopup = () => {
    setIsReplyPopupOpen(false);
  };


  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOption(sort);
    filterEmails(searchQuery, sort);
  };


  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setIsMenuOpen(false); // Ensure menu is closed when selecting a new email
    setShowReplies(false); // Reset reply view state when a new email is selected
  };


  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedEmail((prevEmail) => ({
      ...prevEmail,
      status: newStatus,
    }));
    setEmails(
      emails.map((email) =>
        email.email === selectedEmail.email
          ? { ...email, status: newStatus }
          : email
      )
    );
  };


  const handleDeleteEmail = () => {
    setEmails(emails.filter((email) => email.email !== selectedEmail.email));
    setSelectedEmail(null);
    setIsMenuOpen(false); // Ensure menu is closed after deletion
  };


  const handleRecoverEmail = () => {
    // Implement recovery logic here
  };
  const toggleReplies = () => {
    setShowReplies((prev) => !prev);
  };


  return (
    <div className="flex h-full">
      {/* Leftmost Column */}
      <div className="w-1/4 bg-transparent max-h-screen border border-r-[#2c3236] border-t-0 border-b-0 border-l-0">
        <div className="pl-4 pr-4 pt-2 pb-2">
          {/* Filter Dropdown Selector */}
          <div className="mb-4">
            <div className="relative inline-block w-full">
              <select className="w-full bg-black text-blue-700 px-4 pr-8 text-3xl focus:outline-none focus:border-gray-400">
                <option>All Inbox(s)</option>
                <option>Promotion(s)</option>
                <option>Spam(s)</option>
              </select>
            </div>
          </div>


          {/* Dynamic Text */}
          <div className="text-gray-400 mb-4 pl-2">
            <span className="font-bold text-white pl-2">25/25</span> Inboxes
            selected
          </div>


          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-[#1f2125] text-white py-2 px-4 rounded-md border border-gray-600 focus:outline-none focus:border-gray-400"
            />
          </div>


          {/* New Replies and Sort Filter */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-white font-semibold text-xl">
              <span className="bg-[#1f2125] rounded-full pt-1 pb-1 pr-2 mr-1 pl-2 font-bold text-blue-700">
                26
              </span>
              New replies
            </div>
            <div className="relative inline-block">
              <select
                className="bg-black text-white py-1 px-2 focus:outline-none focus:border-gray-400"
                value={sortOption}
                onChange={handleSortChange}
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
                <option value="Interested">Interested</option>
                <option value="Closed">Closed</option>
                <option value="Booked">Booked</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>


          {/* Email Previews List (Scrollable) */}
          <div className="overflow-y-scroll h-[calc(100vh-280px)] scrollbar-hide">
            {emails.map((email, index) => (
              <div
                key={index}
                onClick={() => handleEmailClick(email)}
                className="p-3 bg-transparent border border-b-0 border-r-0 border-l-0 border-t-[#2c3236] cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-blue-500 mr-2 text-xl">●</span>
                    <span className="text-white">{email.email}</span>
                  </div>
                  <div className="text-gray-400 text-sm">{email.date}</div>
                </div>
                <div className="text-gray-400 text-sm">{email.preview}</div>
                <div className="flex mt-2">
                  {getStatusButton(email.status)}
                  <button className="px-2 bg-[#1f2125] text-white text-xs rounded-full flex flex-row justify-center items-center">
                    <IoIosSend className="h-5 w-5 opacity-60" />
                    <h3 className="mr-1 font-semibold">Campaign Name</h3>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Mid Column (w-1/2) */}
      <div className="w-2/4  border-r border-[#2c3236]">
        {selectedEmail ? (
          <div>
            {/* Header Part */}
            <div className="p-4 flex justify-between items-center mb-4 border-b border-[#2c3236]">
              <div>
                <div className="text-xl text-white font-semibold">
                  {selectedEmail.name}
                </div>
                <div className="text-sm text-gray-400">
                  {selectedEmail.from}
                </div>
              </div>
              <div className="flex items-center">
                {/* Status Dropdown */}
                <select
                  className="bg-[#1f2125] text-white py-2 px-3 text-xs rounded-sm focus:outline-none focus:border-gray-400 border-[#2c3236] border-2"
                  value={selectedEmail.status}
                  onChange={handleStatusChange}
                >
                  <option value="Interested" className="text-green-700">
                    Interested
                  </option>
                  <option value="Closed" className="text-blue-700">
                    Closed
                  </option>
                  <option value="Meeting Booked" className="text-purple-500">
                    Meeting Booked
                  </option>
                  <option value="Meeting Completed" className="text-yellow-500">
                    Meeting Completed
                  </option>
                </select>


                {/* Move/Demo Dropdown */}
                <select className="ml-2 bg-[#1f2125] text-white py-2 px-3 text-xs rounded-sm focus:outline-none focus:border-gray-400 border-[#2c3236] border-2">
                  <option>Move</option>
                  <option>Demo</option>
                </select>


                {/* Three-Dots Menu */}
                <div
                  className="relative ml-2 bg-[#1f2125] rounded-sm border border-[#2c3236]"
                  ref={menuRef}
                >
                  <button
                    className="text-white focus:outline-none"
                    onClick={handleMenuToggle}
                  >
                    <AiOutlineEllipsis className="h-6 w-6 px-1 pt-1" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 bg-[#1f2125] text-white rounded-md shadow-lg w-32 mt-2">
                      <ul>
                        <li
                          className="p-2 hover:bg-[#2c3236] cursor-pointer"
                          onClick={handleDeleteEmail}
                        >
                          Delete Mail
                        </li>
                        <li
                          className="p-2 hover:bg-[#2c3236] cursor-pointer"
                          onClick={handleRecoverEmail}
                        >
                          Recover Mail
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>


            {/* Email Details */}
            <div className="border  border-t-[#2c3236] border-b-[#2c3236] border-l-0 border-r-0 mr-4 ml-4 relative">
              <div className="bg-[#1f2125] p-4 rounded-md text-white mt-4 mb-8 ml-r mr-4">
                <div className="mb-4 text-gray-400 text-sm space-y-3">
                  <div>
                    <div className="flex flex-row justify-between">
                      <strong className="text-white text-xl">
                        {selectedEmail.title}
                      </strong>
                      <div>{selectedEmail.date}</div>
                    </div>
                  </div>
                  <div>
                    <strong>from:</strong> {selectedEmail.from}
                  </div>
                  <div>
                    <strong>to:</strong> {selectedEmail.to}
                  </div>
                </div>


                <div className="bg-[#1f2125]  rounded-md text-white">
                  <div>{selectedEmail.body}</div>
                </div>
              </div>
              {/* View Replies Button */}
              <div className=" p-4 flex flex-row justify-center items-center absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <button
                  onClick={toggleReplies}
                  className="text-white text-sm bg-[#1f2125] pt-2 pb-2 pr-4 pl-4 rounded-sm focus:outline-none"
                >
                  {showReplies ? "Hide Replies" : "View Replies"}
                </button>
              </div>
              {/* Replies Section */}
              {showReplies && (
                <div className=" border-t border-[#2c3236] overflow-y-scroll h-[calc(100vh-410px)] scrollbar-hide">
                  {selectedEmail.replies.map((reply, index) => (
                    <div
                      key={index}
                      className="mb-4 border border-b-[#2c3236] border-r-0 border-l-0 border-t-0"
                    >
                      <div className="bg-[#1f2125] p-4 rounded-md text-white mt-4 mb-8 ml-r mr-4">
                        <div className="mb-4 text-gray-400 text-sm space-y-3">
                          <div>
                            <div className="flex flex-row justify-between">
                              <strong className="text-white text-xl">
                                {selectedEmail.title}
                              </strong>
                              <div>{reply.date}</div>
                            </div>
                          </div>
                          <div>
                            <strong>from:</strong> {reply.from}
                          </div>
                          <div>
                            <strong>to:</strong> {reply.to}
                          </div>
                        </div>


                        <div className="bg-[#1f2125]  rounded-md text-white">
                          <div>{reply.body}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Fixed Reply Button */}
              <div className="fixed bottom-0 left-100 mb-4 ml-4">
                <button
                  onClick={openReplyPopup}
                  className="flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  Reply
                </button>
              </div>
            </div>
            {/* Reply Popup */}
            {isReplyPopupOpen && (
              <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50">
                <div className="bg-[#1f2125] w-1/2 ml-16 mb-4 h-4/5 rounded-md border-[#2c3236] border-2  relative">
                  {/* Header */}
                  <div className="flex justify-between items-center border-b border-[#2c3236] pb-2 bg-[#23272c]">
                    <div className="text-xs pt-2 text-gray-400  pl-8 ">
                      Reply
                    </div>
                    <button
                      onClick={closeReplyPopup}
                      className="text-white text-2xl pr-2 pt-2"
                    >
                      <AiOutlineClose />
                    </button>
                  </div>


                  {/* Email Info */}
                  <div className="mt-2 space-y-2">
                    <div className="text-sm text-gray-300 pl-8 border-b-2 border-[#2c3236] pb-2">
                      <span className="text-gray-500">To: </span>{" "}
                      {selectedEmail.to}
                    </div>
                    <div className="text-sm text-gray-300 pl-8 border-b-2 border-[#2c3236] pb-2">
                      <span className="text-gray-500">From: </span>{" "}
                      {selectedEmail.from}
                    </div>
                    <div className="text-sm text-gray-300 pl-8 border-b-2 border-[#2c3236] pb-2">
                      <span className="text-gray-500">Subject: </span>{" "}
                      {selectedEmail.title}
                    </div>
                  </div>


                  {/* Body */}
                  <div className="mt-4 flex-1 pl-8 pr-8 border-b-2 border-[#2c3236]">
                    <textarea
                      className="w-full h-80 bg-[#1f2125] text-gray-400 text-sm p-2 rounded-md mr-20 appearance-none focus:outline-none focus:border-none"
                      defaultValue={`Hi ${selectedEmail.name},`}
                    />
                  </div>


                  {/* Footer */}
                  <div className="flex justify-between items-center mt-2 px-4">
                    <button className="bg-blue-600 text-white py-2 px-4 rounded-md">
                      Send
                    </button>
                    <div className="flex space-x-4 text-white text-sm">
                      <button>⚡ Variables</button>
                      <button>👁 Preview Email</button>
                      <button>🅰 Formatting</button>
                      <button>🔗 Attach Link</button>
                      <button>🖼 Attach Image</button>
                      <button>🙂 Emojis</button>
                      <button>👥 Mention</button>
                      <button>🧩 Code Snippet</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-400">Select an email to view details</div>
        )}
      </div>
      {/* right Column (w-1/2) */}
      <div className="w-1/4 border border-l-[#2c3236] border-b-0 border-r-0 border-t-0">
        <div className="p-2">
          <div>
            <div className="bg-[#1f2125] rounded-lg mb-4">
              <p className="pt-2 pb-2 pr-4 pl-4">Lead details</p>
            </div>
            {selectedEmail && selectedEmail.lead ? (
              selectedEmail.lead.map((leadDetail, index) => (
                <div
                  key={index}
                  className="pb-2 pr-4 pl-4 space-y-5 text-gray-400"
                >
                  <p className="flex flex-row justify-between">
                    <span>Name:</span> {leadDetail.name}
                  </p>
                  <p className="flex flex-row justify-between">
                    <span>Contact:</span> <span>{leadDetail.contact}</span>
                  </p>
                  <p className="flex flex-row justify-between">
                    <span>Email:</span> <span>{leadDetail.email}</span>
                  </p>
                  <p className="flex flex-row justify-between">
                    <span>LinkedIn:</span>{" "}
                    <a
                      href={`https://${leadDetail.linkedIn}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {leadDetail.linkedIn}
                    </a>
                  </p>
                  <p className="flex flex-row justify-between">
                    <span>Company:</span> {leadDetail.company}
                  </p>
                </div>
              ))
            ) : (
              <p className="pb-2 pr-4 pl-4">No lead details available.</p>
            )}
          </div>
        </div>


        {/* Activities Section */}
        <div className="p-4">
          <div className="bg-[#1f2125] rounded-lg mb-4">
            <p className="pt-2 pb-2 pr-4 pl-4">Activities</p>
          </div>


          {/* Campaign Name */}
          <div className="pt-2 pb-4 pr-4 pl-4 ">
            <p className="font-semibold text-white pb-4">Campaign Name</p>
            <p className="text-sm text-gray-300">
              3 Steps | 5 Days in Sequence
            </p>
          </div>


          {/* Steps */}
          <div className="space-y-4 pl-4 relative">
            {/* Step 1 */}
            <div className="flex flex-row items-center space-x-4">
              <div className="relative w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">
                <FaRegEnvelope />
                {/* Line connecting the steps */}
                <span className="absolute top-8 left-1/2 transform -translate-x-1/2 w-px h-[calc(100%+16px)] bg-gray-600"></span>
              </div>
              <div className="pl-2 space-y-1">
                <p className="text-gray-200">Step 1: Email</p>
                <span className="flex items-center text-xs text-gray-500">
                  <IoIosSend className="mr-1 text-white h-4 w-4" />
                  Sent 3rd, Feb
                </span>
              </div>
            </div>


            {/* Step 2 */}
            <div className="flex flex-row items-center space-x-4">
              <div className="relative w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">
                <FaRegEnvelope />
                {/* Line connecting the steps */}
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-600"></span>
                <span className="absolute top-full left-1/2 transform -translate-x-1/2 w-px h-[calc(100%+16px)] bg-gray-600"></span>
              </div>
              <div className="pl-2 space-y-1">
                <p className="text-gray-200">Step 2: Email</p>
                <span className="flex items-center text-xs text-gray-500">
                  <LuMailOpen className="mr-1 mb-1 text-yellow-300 h-4 w-4" />
                  Opened 5th, Feb
                </span>
              </div>
            </div>


            {/* Step 3 */}
            <div className="flex flex-row items-center space-x-4">
              <div className="relative w-8 h-8 flex items-center justify-center bg-gray-700 rounded-full">
                <FaRegEnvelope />
                {/* No bottom line here as it's the last step */}
                <span className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gray-600"></span>
              </div>
              <div className="pl-2 space-y-1">
                <p className="text-gray-200">Step 3: Email</p>
                <span className="flex items-center text-xs text-gray-500">
                  <LuMailOpen className="mr-1 mb-1 text-yellow-300 h-4 w-4" />
                  Opened 5th, Feb
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DashboardContent;