import { Schema, model } from 'mongoose'

const AnnouncementSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        title: String,
        type: String,
        content: String
    },
    {
        collection: 'Announcements',
        timestamps: true
    }
)

export default model('Announcement', AnnouncementSchema)