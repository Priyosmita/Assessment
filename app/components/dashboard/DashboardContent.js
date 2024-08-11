"use client";
import React, { useState, useEffect, useRef } from "react";
import { IoIosSend, IoMdMore } from "react-icons/io";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiOutlineEllipsis } from "react-icons/ai";
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
  },
  // Add more email data as needed
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
      className={mr-3 px-2 bg-[#1f2125] ${buttonColor} text-xs rounded-full flex items-center}
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

      {/* Right Column (w-1/2) */}
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
                <div className=" border-t border-[#2c3236] overflow-y-scroll h-[calc(100vh-400px)] scrollbar-hide">
                  {selectedEmail.replies.map((reply, index) => (
                    <div key={index} className="mb-4">
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
            </div>
          </div>
        ) : (
          <div className="text-gray-400">Select an email to view details</div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;