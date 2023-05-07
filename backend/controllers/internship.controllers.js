import Internship from '../models/Internship.js'
import User from '../models/User.js'
import { createTransport } from 'nodemailer'
import confirmationMailTemplate from '../public/templates/confirmationMailTemplate.js'

const convertToTR = (internship) => {
  if (internship === 'software') {
    return 'yazılım'
  } else if (internship === 'hardware') {
    return 'donanım'
  } else {
    return 'UME'
  }
}

// Staj oluşturma endpointi
const createInternship = async (req, res) => {
  const { studentID, internship } = await req.body
  const currentUser = await User.find({
    _id: studentID
  })
  const userInternship = await Internship.find({
    studentID,
    internship
  })

  if (userInternship[0] !== undefined) {
    // Kullanıcının staj kaydı varsa hata gönder
    return res.json({
      status: 'fail',
      message: `${currentUser[0].name} ${currentUser[0].surname} zaten ${convertToTR(internship)} stajı yapıyor`,
      userInternship
    })
  } else {
    // Kullanıcının staj kaydı yoksa staj kaydını oluştur
    const internships = new Internship(req.body)

    await internships
      .save()
      .then((data) => {
        return res.json({
          status: 'success',
          message: `${currentUser[0].name} ${currentUser[0].surname} ${convertToTR(internship)} stajı için kayıt yaptırdı`,
          data
        })
      })
      .catch((error) => {
        return res.json({
          status: 'fail',
          message: `${currentUser[0].name} ${currentUser[0].surname} ${convertToTR(internship)} stajı için kayıt yaptıramadı`,
          error
        })
      })
  }
}

// Tüm Stajları listeleme endpointi
const getAllInternships = async (req, res) => {
  const internships = Internship.find({})

  await internships
    .then((data) => {
      return res.json({
        status: 'success',
        message: 'All internships found',
        data
      })
    })
    .catch((error) => {
      return res.json({
        status: 'fail',
        message: 'All internships not found',
        error
      })
    })
}

// Staj onay maili gönderme endpointi
const sendInternshipConfirmationMail = async (req, res) => {
  const { studentID, internship } = await req.body
  const currentUserInternship = await Internship.find({
    studentID,
    internship
  })

  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    service: process.env.EMAIL_SERVICE,
  })

  // Gönderici SMTP bağlantı doğrulama
  await transporter
    .verify()
    .then(async (verified) => {
      // Gönderici SMTP doğrulama başarılı
      if (currentUserInternship[0] !== undefined) {
        await transporter
          .sendMail({
            from: 'Emre Ünaldı <emree.unaldi@gmail.com>',
            to: currentUserInternship[0].companyEmail,
            subject: 'KSÜ Staj Onay Maili ✓',
            html: confirmationMailTemplate(
              currentUserInternship[0].studentID,
              currentUserInternship[0].internship
            )
          })
          .then((data) => {
            // Mail gönderme başarılı
            return res.json({
              status: 'success',
              message: `Staj başvuru maili ${currentUserInternship[0].companyName} şirketine başarıyla gönderildi. Yönlendiriliyor`,
              smtpVerify: verified,
              data
            })
          })
          .catch((error) => {
            // Mail gönderme başarısız
            return res.json({
              status: 'fail',
              message: `Staj başvuru maili ${currentUserInternship[0].companyName} şirketine gönderilirken hata oluştu`,
              smtpVerify: verified,
              error
            })
          })
      } else {
        return res.json({
          status: 'fail',
          message: `Staj başvuru maili gönderilemedi. Mevcut kullanıcı veya stajı bulunamadı`,
          smtpVerify: verified
        })
      }
    })
    .catch((error) => {
      // Gönderici SMTP doğrulama başarısız
      return res.json({
        status: 'fail',
        message: 'SMTP doğrulama hatası oluştu. Mail gönderici bilgileri doğru değil.',
        smtpVerify: false,
        error
      })
    })
}

const companyApprovalStatus = async (req, res) => {
  const { Id, is } = await req.query
  const { Status } = await req.body
  const currentUser = await User.find({ _id: Id })
  const currentInternship = await Internship.find({
    studentID: Id,
    internship: is
  })

  if (currentInternship[0].companyApprovalUpdate === true) {
    // Şirket tarafından öğrenci staj onay durumu güncellenmiş
    return res.json({
      status: 'fail',
      message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
        convertToTR(is)
      } stajı durumu ${currentInternship[0].companyName} şirketi tarafından zaten belirlendi`
    })
  } else {
    // Şirket tarafından öğrenci staj onay durumu güncellenmemiş
    await Internship.findOneAndUpdate(
      { studentID: Id, internship: is },
      { companyApproval: Status, companyApprovalUpdate: true },
      { new: true }
    )
      .then((data) => {
        if (Status) {
          return res.json({
            status: 'success',
            message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
              convertToTR(is)
            } stajı şirket tarafından onaylandı`,
            data
          })
        } else {
          return res.json({
            status: 'fail',
            message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
              convertToTR(is)
            } stajı şirket tarafından reddedildi`,
            data
          })
        }
      })
      .catch((error) => {
        return res.json({
          status: 'fail',
          message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
            convertToTR(is)
          } stajı kaydı güncelleme işleminde hata oluştu`,
          error
        })
      })
  }
}

const consultantApprovalStatus = async (req, res) => {
  const { selectedInternshipId, Status } = await req.body
  const currentInternship = await Internship.find({
    _id: selectedInternshipId,
  })
  const currentUser = await User.find({
    _id: currentInternship[0].studentID
  })

  if (currentInternship[0].consultantApprovalUpdate === true) {
    // Danışman öğretmen tarafından öğrenci staj onay durumu güncellenmiş
    return res.json({
      status: 'fail',
      message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
        convertToTR(currentInternship[0].internship)
      } stajı durumu danışman öğretmen tarafından zaten belirlendi`
    })
  } else {
    // Danışman öğretmen tarafından öğrenci staj onay durumu güncellenmemiş
    await Internship.findOneAndUpdate(
      { _id: selectedInternshipId },
      { consultantApproval: Status, consultantApprovalUpdate: true },
      { new: true }
    )
      .then((data) => {
        if (Status) {
          return res.json({
            status: 'success',
            message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
              convertToTR(currentInternship[0].internship)
            } stajı danışman öğretmen tarafından onaylandı`,
            data
          })
        } else {
          return res.json({
            status: 'fail',
            message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
              convertToTR(currentInternship[0].internship)
            } stajı danışman öğretmen tarafından reddedildi`,
            data
          })
        }
      })
      .catch((error) => {
        return res.json({
          status: 'fail',
          message: `${currentUser[0].name} ${currentUser[0].surname} öğrencimizin ${
            convertToTR(currentInternship[0].internship)
          } stajı kaydı güncelleme işleminde hata oluştu`,
          error
        })
      })
  }
}

export {
  createInternship,
  getAllInternships,
  sendInternshipConfirmationMail,
  companyApprovalStatus,
  consultantApprovalStatus
}
