'use strict'
const Student = use('App/Models/Student')

class StudentController {
    async index ({response}) {
        let students = await Student.all()
        return response.json(students)
    }
    async store ({request, response}) {
        const saa = request.only(["nis", "nama", "kelas"])
        const student = new Student()
        student.nis = saa.nis
        student.nama = saa.nama
        student.kelas = saa.kelas
        await student.save()
        return response.status(201).json(student)
    }
    async show ({params, response}) {
        const student = await Student.find(params.id)
        if (!student) {
            return response.status(404).json({warning: 'Resource not found'})
        }
        return response.json(student)
    }
    async update ({params, request, response}) {
        if (!params) return response.status(404).json({warning: 'Invalid data request'})
        const studentInfo = request.only(['nis', 'nama', 'kelas'])
        const student = await Student.find(params.id)
        if (!student) {
            return response.status(404).json({warning: 'Resource not found'})
        }
        student.nis = studentInfo.nis
        student.nama = studentInfo.nama
        student.kelas = studentInfo.kelas
        await student.save()

        const newStudent = await Student.all()
        return response.status(200).json(newStudent)
    }
    async delete ({params, response}) {
        const student = await Student.find(params.id)
        if (!student) {
            return response.status(404).json({warning: 'Resource not found'})
        }
        await student.delete()
        return response.status(204).json({warning: `The student with id ${params.id} has been deleted`})
    }
}
module.exports = StudentController