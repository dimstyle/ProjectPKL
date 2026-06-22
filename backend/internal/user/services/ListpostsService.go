package services

import (
	"backend/internal/db"
	"context"
	"log"

	"time"
)

func NewListpostsService(q *db.Queries) *ListpostsService{
	return &ListpostsService{
		repo: q,
	}
}

type ListpostsService struct {
	repo *db.Queries
}

func (service *ListpostsService) GetPosts(ctx context.Context, time_range string)([]db.GetTextPostsByTimeRow, error){
	StartTime, EndTime := timeParse(time_range)

	user_posts, err := service.repo.GetTextPostsByTime(ctx, db.GetTextPostsByTimeParams{
		StartTime: StartTime,
		EndTime: EndTime,
	})
	if err != nil{
		log.Println(err.Error())
		return []db.GetTextPostsByTimeRow{},err
	}

	return user_posts, nil
}

func timeParse(time_range string) (time.Time, time.Time){
	now := time.Now().UTC()

	switch time_range{
	case "from_last_30m":
		return now.Add(-30 * time.Minute), now
	case "from_last_hour":
		return now.Add(-1 * time.Hour) , now
	case "from_last_24h":
		return now.Add(-24 * time.Hour), now
	case "from_last_week":
		return now.Add(-7 * 24 * time.Hour), now
	
	default:
		return now.Add(-1 * time.Hour), now
		
	}	
}
