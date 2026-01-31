import { pgTable, serial, text, timestamp, pgEnum, integer } from 'drizzle-orm/pg-core';

export const energyLevelEnum = pgEnum('energy_level', ['high', 'medium', 'low']);
export const taskStatusEnum = pgEnum('task_status', ['active', 'completed']);
export const resourceTypeEnum = pgEnum('resource_type', ['file', 'url', 'note']);

export const tasks = pgTable('tasks', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  energyLevel: energyLevelEnum('energy_level').default('medium').notNull(),
  status: taskStatusEnum('status').default('active').notNull(),
  dueDate: timestamp('due_date'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  taskId: integer('task_id').references(() => tasks.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  type: resourceTypeEnum('type').notNull(),
  content: text('content').notNull(), // URL, file path, or note text
  createdAt: timestamp('created_at').defaultNow().notNull(),
});