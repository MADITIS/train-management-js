/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);



export const timeFromNow = (dateTime: string) => `${dayjs(dateTime).fromNow(true)} ago`;
