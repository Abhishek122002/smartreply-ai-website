import { useEffect, useState } from "react"
import { api } from "../Landing/services/api"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/ui/card"

import { Button } from "@/ui/button"
import { Badge } from "@/ui/badge"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"

export default function AccountPage() {
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState<any>({})
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("sr_token")
    const user = localStorage.getItem("sr_user")

    if (!token || !user) {
      setLoading(false)
      return
    }

    const parsedUser = JSON.parse(user)

    api
      .getUserDetails(token, parsedUser.id)
      .then((data) => {
        setUserData(data)
        setForm(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (!file) return

  // optional size limit (2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert("File must be under 2MB")
    return
  }

  const reader = new FileReader()
  reader.onloadend = () => {
    const base64 = reader.result as string

    // set preview
    setAvatarPreview(base64)

    // update localStorage user
    const savedUser = localStorage.getItem("sr_user")
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      parsedUser.avatar = base64
      localStorage.setItem("sr_user", JSON.stringify(parsedUser))

      // trigger header refresh
      window.dispatchEvent(new Event("storage"))
    }
  }

  reader.readAsDataURL(file)
}

  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length > 6) score++
    if (/[A-Z]/.test(password)) score++
    if (/[0-9]/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  }

  const strength = getPasswordStrength(newPassword)

  const handleSave = () => {
    console.log("Updated Data:", form)
  }

  return (
    <div className="min-h-screen bg-muted/40">

      {/* Banner */}
      <div className="bg-blue-600 text-white text-sm py-3 px-4 text-center">
        Upgrade your subscription today ⚡ Get 30% Discount for all plans.
        <Button
          size="sm"
          className="ml-4 bg-white text-blue-600 hover:bg-gray-100"
        >
          Get Now
        </Button>
      </div>

      <div className="max-w-5xl mx-auto py-10 px-6 space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold">Account Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your profile and account preferences
          </p>
        </div>

        {loading && <p>Loading...</p>}

        {!loading && userData && (
          <>

            {/* ================= PROFILE ================= */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Avatar */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center overflow-hidden text-lg font-semibold">
                      {avatarPreview ? (
                        <img
                          src={avatarPreview}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        userData?.name?.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div>
                      <p className="font-medium">Profile Photo</p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG. Max 2MB.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleAvatarChange}
                      />
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </label>

                    {avatarPreview && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setAvatarPreview(null)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input
                    name="name"
                    value={form.name || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    name="phone"
                    value={form.phone || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <Label>Job Title</Label>
                  <Input
                    name="jobTitle"
                    value={form.jobTitle || ""}
                    onChange={handleChange}
                    placeholder="e.g. Product Manager"
                  />
                </div>

                {/* Company */}
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    name="company"
                    value={form.company || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Industry */}
                <div className="space-y-2">
                  <Label>Industry</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={form.industry || ""}
                    onChange={(e) =>
                      setForm({ ...form, industry: e.target.value })
                    }
                  >
                    <option value="">Select industry</option>
                    <option>Technology</option>
                    <option>Marketing</option>
                    <option>Sales</option>
                    <option>Customer Support</option>
                    <option>Education</option>
                    <option>Healthcare</option>
                    <option>Finance</option>
                    <option>Other</option>
                  </select>
                </div>

                <Button onClick={handleSave}>Save Changes</Button>

              </CardContent>
            </Card>

            {/* ================= EMAIL ================= */}
            <Card>
              <CardHeader>
                <CardTitle>Email Verification</CardTitle>
              </CardHeader>

              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{userData?.email}</p>
                  <Badge variant={userData?.emailVerified ? "default" : "destructive"}>
                    {userData?.emailVerified ? "Verified" : "Not Verified"}
                  </Badge>
                </div>

                {!userData?.emailVerified && (
                  <Button variant="outline">
                    Resend Verification
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* ================= AI PREFERENCES ================= */}
            <Card>
              <CardHeader>
                <CardTitle>AI Preferences</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="space-y-2">
                  <Label>Default Tone</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={form.defaultTone || ""}
                    onChange={(e) =>
                      setForm({ ...form, defaultTone: e.target.value })
                    }
                  >
                    <option value="">Select tone</option>
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Casual</option>
                    <option>Formal</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Default Reply Length</Label>
                  <select
                    className="w-full border rounded-md p-2 text-sm"
                    value={form.defaultLength || ""}
                    onChange={(e) =>
                      setForm({ ...form, defaultLength: e.target.value })
                    }
                  >
                    <option value="">Select length</option>
                    <option>Short</option>
                    <option>Medium</option>
                    <option>Long</option>
                  </select>
                </div>

              </CardContent>
            </Card>

            {/* ================= PASSWORD ================= */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">

                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <div className="h-2 rounded bg-gray-200">
                    <div
                      className={`h-2 rounded ${
                        strength <= 1
                          ? "bg-red-500 w-1/4"
                          : strength === 2
                          ? "bg-yellow-500 w-2/4"
                          : strength === 3
                          ? "bg-blue-500 w-3/4"
                          : "bg-green-500 w-full"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <Button
                  onClick={() => {
                    if (newPassword !== confirmPassword) {
                      alert("Passwords do not match")
                      return
                    }
                    alert("Password updated!")
                  }}
                >
                  Update Password
                </Button>

              </CardContent>
            </Card>

          </>
        )}

      </div>
    </div>
  )
}