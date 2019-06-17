const notificationDao = require("../dao/notification.dao");
class NotificationController {

    async index(req, res) {
        await notificationDao.updateEtatNotif(async (resolve) => {
            await res.render("notification");
        });
    }

    async getNotifs(req, res) {
        const { id_user } = req.session.userInfo;

        await notificationDao.getNotifs(id_user, async (resolve) => {
            await res.json(resolve.data);
        });
    }

    async getNotifsUnread(req, res) {
        const { id_user } = req.session.userInfo;

        await notificationDao.getNotifsUnread(id_user, async (resolve) => {
            await res.json(resolve.data);
        });
    }
}

module.exports = new NotificationController();