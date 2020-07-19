// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.PriorityQueue;
import java.util.Set;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(final Collection<Event> events, final MeetingRequest request) {

    List<TimeRange> validList = new ArrayList<>();
    int duration = (int) request.getDuration();
    Collection<String> peoplSet = request.getAttendees();
    List<Event> eventList = new ArrayList<>();

    for (Iterator<Event> iterator = events.iterator(); iterator.hasNext();) {
      Event e = iterator.next();
      eventList.add(e);
    }

    PriorityQueue<Integer> overlapped = new PriorityQueue<Integer>();
    int currentTime = 0, eventIndex=0;
    int startTime = -1, endTime = duration;

    while (currentTime <= TimeRange.END_OF_DAY+1-duration) {
      TimeRange currentTimeRange = new TimeRange(currentTime, duration);

      while(!overlapped.isEmpty()) {
        if(overlapped.peek().intValue() == currentTime ) {
          overlapped.poll();
        } else {
          break;
        }
      }

      while(eventIndex<eventList.size() && eventList.get(eventIndex).getWhen().overlaps(currentTimeRange) ) {
        if( attendeesPresentInBoth( eventList.get(eventIndex).getAttendees(), peoplSet) ) {
          overlapped.add(new Integer(eventList.get(eventIndex).getWhen().end()));
        }
        eventIndex++;
      }
      
      if(overlapped.isEmpty()){
        if(startTime == -1) {
          startTime = currentTime;
          endTime = startTime + duration;
        } else {
          endTime++;
        }
      } else {
        if(startTime != -1) {
          validList.add(new TimeRange(startTime, endTime-startTime));
        }
        startTime = -1;
      }
      currentTime++;
    }
    
    if(overlapped.isEmpty() && startTime!=-1) {
      validList.add(new TimeRange(startTime, endTime-startTime ));
    }

    return validList;
  }

  public boolean attendeesPresentInBoth(Set<String> attendesList, Collection<String> peopleSet) {
    for (String attendee : attendesList) {
      if(peopleSet.contains(attendee)) {
        return true;
      }
    }
    return false;
  }
}
