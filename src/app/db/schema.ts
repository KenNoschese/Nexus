import { pgTable, uuid, varchar, text, timestamp, boolean, integer, decimal, date, jsonb, pgEnum, uniqueIndex, index, check } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const energyLevelEnum = pgEnum('energy_level', ['high', 'medium', 'low']);
export const taskStatusEnum = pgEnum('task_status', ['active', 'ongoing', 'completed']);
export const resourceTypeEnum = pgEnum('resource_type', ['file', 'url', 'note']);

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  fullName: varchar('full_name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  lastLogin: timestamp('last_login', { withTimezone: true }),
  timezone: varchar('timezone', { length: 50 }).default('UTC'),
  isActive: boolean('is_active').default(true).notNull(),
});

export const tasks = pgTable('tasks', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 500 }).notNull(),
  description: text('description'),
  energyLevel: energyLevelEnum('energy_level').notNull(),
  status: taskStatusEnum('status').default('active').notNull(),
  dueDate: timestamp('due_date', { withTimezone: true }),
  estimatedDuration: integer('estimated_duration'),
  actualDuration: integer('actual_duration'),
  position: integer('position'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  completedAt: timestamp('completed_at', { withTimezone: true }),
  archivedAt: timestamp('archived_at', { withTimezone: true }),
}, (table) => ({
  userStatusIdx: index('idx_tasks_user_status').on(table.userId, table.status),
  userEnergyIdx: index('idx_tasks_user_energy').on(table.userId, table.energyLevel),
  dueDateIdx: index('idx_tasks_due_date').on(table.dueDate),
}));
