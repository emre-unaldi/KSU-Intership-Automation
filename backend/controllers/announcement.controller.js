import Announcement from '../models/Announcement.js'

// Duyuru oluşturma endpointi
export const createAnnouncement = async (req, res) => {
    const { title, type, userId } = await req.body

    if (!userId) {
        return res.json({
            status: 'fail',
            message: 'Kullanıcı kimliği bulunamadığı için duyuru oluşturulamadı'
        })
    } else {
        const announcement = new Announcement(req.body) 

        await announcement
            .save()
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: `${title} başlıklı ${type} duyurusu başarıyla oluşturuldu`,
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: `${title} başlıklı ${type} duyurusu oluşturulamadı`,
                    error
                })
            })
    }
}

// Tüm duyuruları listeleme endpointi
export const getAllAnnouncements = async (req, res) => {
    const announcements = Announcement.find({})

    await announcements
        .then((data) => {
            return res.json({
                status: 'success',
                message: 'All announcements found',
                data
            })
        })
        .catch((error) => {
            return res.json({
                status: 'fail',
                message: 'All announcements not found',
                error
            })
        })
}

// Duyuru güncelleme endpointi
export const updateAnnouncement = async (req, res) => {
    const { _id, title, type, content } = await req.body

    if (!_id) {
        return res.json({
            status: 'fail',
            message: 'Duyuru kimliği bulunamadığı için duyuru güncellenemedi'
        })
    } else {
        await Announcement.findByIdAndUpdate(
            { _id },
            { title, type, content },
            { new: true }
        )
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: `Duyuru ${type} duyurusu olarak başarıyla güncellendi`,
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: `Duyuru ${type} duyurusu olarak güncellenemedi`,
                    error
                })
            })
    }
}

// Duyuru silme endpointi
export const deleteAnnouncement = async (req, res) => {
    const { _id } = await req.body
    
    if (!_id) {
        return res.json({
            status: 'fail',
            message: 'Duyuru kimliği bulunamadığı için duyuru silinemedi'
        })
    } else {
        await Announcement.findByIdAndDelete(_id)
            .then((data) => {
                return res.json({
                    status: 'success',
                    message: 'Duyuru başarıyla silindi',
                    data
                })
            }).catch((error) => {
                return res.json({
                    status: 'fail',
                    message: 'Duyuru silinemedi',
                    error
                })
            })
    }
}   
