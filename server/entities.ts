import { PrismaClient, Prisma } from '../prisma-generated/client';
import {
  AccountUser, 
  AccountUser_uniqueKey, 
  AccountUser_without_PKs, 
  BusinessFacts, 
  BusinessFacts_uniqueKey, 
  BusinessFacts_without_PKs, 
  CmsConfig, 
  CmsConfig_uniqueKey, 
  CmsConfig_without_PKs, 
  InstagramConfig, 
  InstagramConfig_uniqueKey, 
  InstagramConfig_without_PKs, 
  InstagramPost, 
  InstagramPost_uniqueKey, 
  InstagramPost_without_PKs, 
  OpeningHour, 
  OpeningHour_uniqueKey, 
  OpeningHour_without_PKs, 
  PastryItem, 
  PastryItem_uniqueKey, 
  PastryItem_without_PKs, 
  filtered_AccountUser, 
  filtered_BusinessFacts, 
  filtered_CmsConfig, 
  filtered_InstagramConfig, 
  filtered_InstagramPost, 
  filtered_OpeningHour, 
  filtered_PastryItem,
  Entities
} from './entities.type';

export const prisma = new PrismaClient();

export const default_entities: Entities = {
  accountuser: {
    /**
        * 创建accountuser记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: AccountUser): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating accountuser:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting accountuser:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_AccountUser): Promise<AccountUser[]> => {
            try {
                return await prisma.accountuser.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all accountuser:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_AccountUser
        ): Promise<AccountUser[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.accountuser.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged accountuser:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_AccountUser)
        * @returns 记录数量
        */
        Count: async (args?: filtered_AccountUser): Promise<number> => {
            try {
                return await prisma.accountuser.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting accountuser:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: AccountUser_uniqueKey; data: AccountUser_without_PKs }): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating accountuser:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: AccountUser_uniqueKey): Promise<AccountUser | null> => {
            try {
                return await prisma.accountuser.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting accountuser:`, error);
                return null;
            }
        },  },
  businessfacts: {
    /**
        * 创建businessfacts记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: BusinessFacts): Promise<BusinessFacts | null> => {
            try {
                return await prisma.businessfacts.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating businessfacts:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: BusinessFacts_uniqueKey): Promise<BusinessFacts | null> => {
            try {
                return await prisma.businessfacts.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting businessfacts:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_BusinessFacts)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_BusinessFacts): Promise<BusinessFacts[]> => {
            try {
                return await prisma.businessfacts.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all businessfacts:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_BusinessFacts)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_BusinessFacts
        ): Promise<BusinessFacts[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.businessfacts.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged businessfacts:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_BusinessFacts)
        * @returns 记录数量
        */
        Count: async (args?: filtered_BusinessFacts): Promise<number> => {
            try {
                return await prisma.businessfacts.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting businessfacts:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: BusinessFacts_uniqueKey; data: BusinessFacts_without_PKs }): Promise<BusinessFacts | null> => {
            try {
                return await prisma.businessfacts.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating businessfacts:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: BusinessFacts_uniqueKey): Promise<BusinessFacts | null> => {
            try {
                return await prisma.businessfacts.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting businessfacts:`, error);
                return null;
            }
        },  },
  openinghour: {
    /**
        * 创建openinghour记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: OpeningHour): Promise<OpeningHour | null> => {
            try {
                return await prisma.openinghour.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating openinghour:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: OpeningHour_uniqueKey): Promise<OpeningHour | null> => {
            try {
                return await prisma.openinghour.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting openinghour:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_OpeningHour)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_OpeningHour): Promise<OpeningHour[]> => {
            try {
                return await prisma.openinghour.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all openinghour:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_OpeningHour)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_OpeningHour
        ): Promise<OpeningHour[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.openinghour.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged openinghour:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_OpeningHour)
        * @returns 记录数量
        */
        Count: async (args?: filtered_OpeningHour): Promise<number> => {
            try {
                return await prisma.openinghour.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting openinghour:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: OpeningHour_uniqueKey; data: OpeningHour_without_PKs }): Promise<OpeningHour | null> => {
            try {
                return await prisma.openinghour.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating openinghour:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: OpeningHour_uniqueKey): Promise<OpeningHour | null> => {
            try {
                return await prisma.openinghour.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting openinghour:`, error);
                return null;
            }
        },  },
  cmsconfig: {
    /**
        * 创建cmsconfig记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: CmsConfig): Promise<CmsConfig | null> => {
            try {
                return await prisma.cmsconfig.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating cmsconfig:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: CmsConfig_uniqueKey): Promise<CmsConfig | null> => {
            try {
                return await prisma.cmsconfig.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting cmsconfig:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_CmsConfig)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_CmsConfig): Promise<CmsConfig[]> => {
            try {
                return await prisma.cmsconfig.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all cmsconfig:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_CmsConfig)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_CmsConfig
        ): Promise<CmsConfig[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.cmsconfig.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged cmsconfig:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_CmsConfig)
        * @returns 记录数量
        */
        Count: async (args?: filtered_CmsConfig): Promise<number> => {
            try {
                return await prisma.cmsconfig.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting cmsconfig:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: CmsConfig_uniqueKey; data: CmsConfig_without_PKs }): Promise<CmsConfig | null> => {
            try {
                return await prisma.cmsconfig.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating cmsconfig:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: CmsConfig_uniqueKey): Promise<CmsConfig | null> => {
            try {
                return await prisma.cmsconfig.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting cmsconfig:`, error);
                return null;
            }
        },  },
  instagramconfig: {
    /**
        * 创建instagramconfig记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: InstagramConfig): Promise<InstagramConfig | null> => {
            try {
                return await prisma.instagramconfig.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating instagramconfig:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: InstagramConfig_uniqueKey): Promise<InstagramConfig | null> => {
            try {
                return await prisma.instagramconfig.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting instagramconfig:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_InstagramConfig)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_InstagramConfig): Promise<InstagramConfig[]> => {
            try {
                return await prisma.instagramconfig.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all instagramconfig:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_InstagramConfig)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_InstagramConfig
        ): Promise<InstagramConfig[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.instagramconfig.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged instagramconfig:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_InstagramConfig)
        * @returns 记录数量
        */
        Count: async (args?: filtered_InstagramConfig): Promise<number> => {
            try {
                return await prisma.instagramconfig.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting instagramconfig:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: InstagramConfig_uniqueKey; data: InstagramConfig_without_PKs }): Promise<InstagramConfig | null> => {
            try {
                return await prisma.instagramconfig.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating instagramconfig:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: InstagramConfig_uniqueKey): Promise<InstagramConfig | null> => {
            try {
                return await prisma.instagramconfig.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting instagramconfig:`, error);
                return null;
            }
        },  },
  pastryitem: {
    /**
        * 创建pastryitem记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: PastryItem): Promise<PastryItem | null> => {
            try {
                return await prisma.pastryitem.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating pastryitem:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: PastryItem_uniqueKey): Promise<PastryItem | null> => {
            try {
                return await prisma.pastryitem.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting pastryitem:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_PastryItem)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_PastryItem): Promise<PastryItem[]> => {
            try {
                return await prisma.pastryitem.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all pastryitem:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_PastryItem)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_PastryItem
        ): Promise<PastryItem[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.pastryitem.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged pastryitem:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_PastryItem)
        * @returns 记录数量
        */
        Count: async (args?: filtered_PastryItem): Promise<number> => {
            try {
                return await prisma.pastryitem.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting pastryitem:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: PastryItem_uniqueKey; data: PastryItem_without_PKs }): Promise<PastryItem | null> => {
            try {
                return await prisma.pastryitem.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating pastryitem:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: PastryItem_uniqueKey): Promise<PastryItem | null> => {
            try {
                return await prisma.pastryitem.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting pastryitem:`, error);
                return null;
            }
        },  },
  instagrampost: {
    /**
        * 创建instagrampost记录
        * @param data 包含所有字段的数据 (包括手动设置的主键)
        * @returns 创建的记录或null
        */
        Create: async (data: InstagramPost): Promise<InstagramPost | null> => {
            try {
                return await prisma.instagrampost.create({
                    data: data 
                });
            } catch (error) {
                console.error(`Error creating instagrampost:`, error);
                return null;
            }
        },

    /**
        * 根据主键获取记录
        * @param args 主键参数
        * @returns 记录或null
        */
        Get: async (args: InstagramPost_uniqueKey): Promise<InstagramPost | null> => {
            try {
                return await prisma.instagrampost.findUnique({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error getting instagrampost:`, error);
                return null;
            }
        },

    /**
        * 获取所有记录
        * @param args 可选筛选条件 (类型: filtered_InstagramPost)
        * @returns 记录数组
        */
        GetAll: async (args?: filtered_InstagramPost): Promise<InstagramPost[]> => {
            try {
                return await prisma.instagrampost.findMany({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error getting all instagrampost:`, error);
                return [];
            }
        },

    /**
        * 分页获取记录
        * @param pageNumber 页码 (默认 1)
        * @param pageSize 每页大小 (默认 10)
        * @param args 可选筛选条件 (类型: filtered_InstagramPost)
        * @returns 分页记录数组
        */
        GetPage: async (
            pageNumber: number = 1,
            pageSize: number = 10,
            args?: filtered_InstagramPost
        ): Promise<InstagramPost[]> => {
            try {
                const skip = (pageNumber - 1) * pageSize;
                return await prisma.instagrampost.findMany({
                    where: args as any, 
                    skip,
                    take: pageSize,
                });
            } catch (error) {
                console.error(`Error getting paged instagrampost:`, error);
                return [];
            }
        },

    /**
        * 统计记录数
        * @param args 可选筛选条件 (类型: filtered_InstagramPost)
        * @returns 记录数量
        */
        Count: async (args?: filtered_InstagramPost): Promise<number> => {
            try {
                return await prisma.instagrampost.count({
                    where: args as any, 
                });
            } catch (error) {
                console.error(`Error counting instagrampost:`, error);
                return 0;
            }
        },

    /**
        * 更新记录
        * @param args 包含主键 (where) 和更新数据 (data)
        * @returns 更新后的记录或null
        */
        Update: async (args: { where: InstagramPost_uniqueKey; data: InstagramPost_without_PKs }): Promise<InstagramPost | null> => {
            try {
                return await prisma.instagrampost.update({
                    where: { id: args.where.id },
                    data: args.data 
                });
            } catch (error) {
                console.error(`Error updating instagrampost:`, error);
                return null;
            }
        },

    /**
        * 删除记录
        * @param args 主键参数
        * @returns 删除的记录或null
        */
        Delete: async (args: InstagramPost_uniqueKey): Promise<InstagramPost | null> => {
            try {
                return await prisma.instagrampost.delete({
                    where: { id: args.id },
                });
            } catch (error) {
                console.error(`Error deleting instagrampost:`, error);
                return null;
            }
        },  },
};
