import { Schema, model } from 'mongoose'

const EducationPeriodSchema = new Schema(
    {
        userId: Schema.Types.ObjectId,
        dateRange: Array,
        type: String,
        isPeriod: {
            type: Boolean,
            default: false
        }
    },
    {
        collection: 'EducationPeriod',
        timestamps: true
    }
) 

export default model('EducationPeriod', EducationPeriodSchema)