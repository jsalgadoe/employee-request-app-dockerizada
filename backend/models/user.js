import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";

export class UserModel {
  static async findByUserName(name) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: name.toLowerCase(),
        },
        select: {
          name: true,
          id: true,
          status: true,
          is_admin: true,
          password: true,
        },
      });

      if (!user) return null;

      return user;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }
  static async registerUser({ name, password, is_admin, status }) {
    try {
      const salt = bcrypt.genSaltSync();
      const password_bcrypt = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          name: name.toLowerCase(),
          password: password_bcrypt,
          is_admin: is_admin,
          status: status,
        },
        select: {
          id: true,
          name: true,
          is_admin: true,
        },
      });

      return user;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }

  static async findByUserId(id) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
        select: {
          name: true,
          id: true,
          status: true,
          is_admin: true,
        },
      });

      if (!user) return null;

      return user;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }

  static async registerUserAdmin({ name, password }) {
    try {
      const salt = bcrypt.genSaltSync();
      const password_bcrypt = bcrypt.hashSync(password, salt);

      const user = await prisma.user.create({
        data: {
          name: name.toLowerCase(),
          password: password_bcrypt,
          is_admin: true,
          status: true,
        },
        select: {
          id: true,
          name: true,
          is_admin: true,
        },
      });

      return user;
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
    }
  }

  static async findAll(search_term = "", page_number = 1, page_size = 10) {
    const offset = (page_number - 1) * page_size;

    try {
      const results = await prisma.user.findMany({
        skip: Number(offset),
        take: Number(page_size),
        where: {
          name: {
            contains: search_term,
            mode: "insensitive",
          },
        },
        select: {
          id: true,
          status: true,
          is_admin: true,
          name: true,
        },
        orderBy: {
          id: "desc",
        },
      });

      const totalResults = await prisma.user.count({
        where: {
          name: {
            contains: search_term,
            mode: "insensitive",
          },
        },
      });

      const total_pages = Math.ceil(totalResults / page_size);

      return {
        current_page: parseInt(page_number),
        total_pages: total_pages,
        total_results: totalResults,
        page_size: parseInt(page_size),
        has_next_page: page_number < total_pages,
        has_previous_page: page_number > 1,
        results: results,
      };
    } catch (err) {
      console.error("Error ejecutando la consulta:", err.stack);
      throw err;
    }
  }

  static async updateUser({ id, status, is_admin }) {
    console.log(id, status, is_admin);
    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: {
          status: status,
          is_admin: is_admin,
        },
        select: {
          id: true,
          name: true,
          status: true,
          is_admin: true,
        },
      });

      if (updatedUser.length === 0) return null;
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
    }
  }
}
