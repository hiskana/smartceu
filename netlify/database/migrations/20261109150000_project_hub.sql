CREATE TABLE hub_posts (
 id UUID PRIMARY KEY,
 author TEXT NOT NULL CHECK (author IN ('Iska','Matthew')),
 kind TEXT NOT NULL CHECK (kind IN ('Comment','Idea','Assessment','Strategy','Update')),
 body TEXT NOT NULL CHECK (length(body) BETWEEN 1 AND 8000),
 created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE hub_tasks (
 id UUID PRIMARY KEY,
 title TEXT NOT NULL CHECK (length(title) BETWEEN 1 AND 160),
 details TEXT NOT NULL DEFAULT '' CHECK (length(details) <= 4000),
 status TEXT NOT NULL CHECK (status IN ('To Do','Doing','Done')),
 owner TEXT NOT NULL CHECK (owner IN ('Unassigned','Iska','Matthew','Together')),
 category TEXT NOT NULL CHECK (category IN ('App','Courses','Strategy','Marketing')),
 source_post UUID REFERENCES hub_posts(id),
 version INTEGER NOT NULL DEFAULT 1,
 created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
 updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX hub_posts_created ON hub_posts (created_at DESC);
INSERT INTO hub_tasks(id,title,details,status,owner,category) VALUES
('11111111-1111-4111-8111-111111111111','Build the PT / LVN home and navigation','Simple profession tiles, mobile navigation and FAQ helper are implemented.','Done','Iska','App'),
('11111111-1111-4111-8111-111111111112','Connect the preview learner journey','Catalog, course details, reader, practice, completion record and saved local activity.','Done','Iska','App'),
('11111111-1111-4111-8111-111111111113','Publish the learning preview','The preview is published on Netlify. It awards no CE credit.','Done','Iska','App'),
('11111111-1111-4111-8111-111111111114','Launch the shared project Hub','Verify shared posts, task changes and synchronization across browsers.','Doing','Iska','App'),
('11111111-1111-4111-8111-111111111115','Review the de-escalation curriculum','Check accuracy, learning objectives, scenarios and current references.','To Do','Matthew','Courses'),
('11111111-1111-4111-8111-111111111116','Complete instructor evidence and provider requirements','Confirm qualifications, self-paced delivery, evaluation and contact-hour requirements.','To Do','Matthew','Courses'),
('11111111-1111-4111-8111-111111111117','Develop the first full PT and LVN courses','The existing three-section preview is not a two-hour course.','To Do','Together','Courses'),
('11111111-1111-4111-8111-111111111118','Agree on launch scope and budget','Decide first audience, course offering, responsibilities and spending limits. Keep sensitive terms offline.','To Do','Together','Strategy'),
('11111111-1111-4111-8111-111111111119','Interview PT and LVN learners','Ask about their last CE purchase, topic needs and willingness to pay.','To Do','Together','Marketing'),
('11111111-1111-4111-8111-111111111120','Plan the first marketing message','Use interview findings to define the audience and offer.','To Do','Together','Marketing'),
('11111111-1111-4111-8111-111111111121','Add learner accounts and durable course records','Preview progress currently stays in one browser; qualifying CE needs server records.','To Do','Iska','App'),
('11111111-1111-4111-8111-111111111122','Add payment and qualifying certificates','After requirements and approval are established.','To Do','Iska','App'),
('11111111-1111-4111-8111-111111111123','Restrict Hub access to the founders','Access control is intentionally deferred. Author names are currently self-selected.','To Do','Iska','App');
