declare const $;

const timer = 3000;

const placement = {
    from: "top",
    align: "right"
}

export class Toaster {

    success(message: string) {
        $.notifyClose();
        $.notify({
            title: 'Success',
            message: message
        }, {
            type: 'success',
            timer: timer,
            placement: placement,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" style="color:white;" data-notify="dismiss">×</button>' +
                '<div class="col-12 p-0">' +
                '<div class="row">' +
                '<div class="col-2 p-0 d-flex justify-content-center"><i class="material-icons" style="font-size: 2.5rem;color: whitesmoke;">check</i></div>' +
                '<div class="col-10 p-0">' +
                '<span data-notify="title"><strong>{1}</strong></span>' +
                '<span data-notify="message" style="font-size:80%;">{2}</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }

    error(message: string) {
        $.notifyClose();
        $.notify({
            title: 'Error',
            message: message
        }, {
            type: 'danger',
            timer: timer,
            placement: placement,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" style="color:white;" data-notify="dismiss">×</button>' +
                '<div class="col-12 p-0">' +
                '<div class="row">' +
                '<div class="col-2 p-0 d-flex justify-content-center"><i class="material-icons" style="font-size: 2.5rem;color: whitesmoke;">error_outline</i></div>' +
                '<div class="col-10 p-0">' +
                '<span data-notify="title">{1}</span>' +
                '<span data-notify="message" style="font-size:80%;">{2}</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }

    warning(message: string) {
        $.notify({
            title: 'Warning',
            message: message
        }, {
            type: 'warning',
            timer: timer,
            placement: placement,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
                '<button type="button" aria-hidden="true" class="close" style="color:white;" data-notify="dismiss">×</button>' +
                '<div class="col-12 p-0">' +
                '<div class="row">' +
                '<div class="col-2 p-0 d-flex justify-content-center"><i class="material-icons" style="font-size: 2.5rem;color: whitesmoke;">warning</i></div>' +
                '<div class="col-10 p-0">' +
                '<span data-notify="title">{1}</span>' +
                '<span data-notify="message" style="font-size:80%;">{2}</span>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>'
        });
    }

}
