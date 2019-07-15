'use strict'

const Route = use('Route')

Route.group(() => {
    Route.get('students', 'StudentController.index')
    Route.get('students/:id', 'StudentController.show')
    Route.post('students', 'StudentController.store')
    Route.put('students/:id', 'StudentController.update')
    Route.delete('students/:id', 'StudentController.delete')
}).prefix('api/v1')