import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { getDoctorProfile, updateDoctorProfile } = useContext(DoctorContext);
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);

  // Form fields
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [fees, setFees] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const doc = await getDoctorProfile();
      if (!doc) return;
      setProfile(doc);
      setName(doc.name);
      setSpeciality(doc.speciality);
      setDegree(doc.degree);
      setExperience(doc.experience);
      setAbout(doc.about);
      setFees(doc.fees);
      setAddressLine1(doc.address?.line1 || "");
      setAddressLine2(doc.address?.line2 || "");
    };

    fetchProfile();
  }, [getDoctorProfile]);

  const handleSave = async () => {
    try {
      const updated = await updateDoctorProfile({
        name,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: { line1: addressLine1, line2: addressLine2 },
        image,
      });

      if (updated) {
        toast.success("Profile updated successfully");
        setProfile(updated);
        setEditing(false);
        setImage(null);
      }
    } catch (err) {
      toast.error("Failed to update profile");
    }
  };

  if (!profile) {
    return <div className="p-6 text-center text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 w-full max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6 space-y-5">
        <div className="flex items-center space-x-4">
          <img
            src={image ? URL.createObjectURL(image) : profile.image}
            alt="Doctor"
            className="w-24 h-24 rounded-full object-cover border"
          />
          {editing && (
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="text-sm text-gray-500"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Speciality</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Degree</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Experience</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Consultation Fees</label>
            <input
              type="number"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              readOnly={!editing}
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">About</label>
          <textarea
            className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows="3"
            readOnly={!editing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Address Line 1</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              readOnly={!editing}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Address Line 2</label>
            <input
              type="text"
              className={`w-full border px-2 py-1 rounded-md ${!editing && "bg-gray-100 cursor-not-allowed"}`}
              value={addressLine2}
              onChange={(e) => setAddressLine2(e.target.value)}
              readOnly={!editing}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
            >
              Update Profile
            </button>
          )}
          {editing && (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
