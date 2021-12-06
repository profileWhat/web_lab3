package data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Table(name = "RESULTS")
@Entity
public class Result implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "ID")
    private int id;
    @Column(name = "valueX")
    private double x;
    @Column(name = "valueY")
    private double y;
    @Column(name = "valueR")
    private double r;
    @Column(name = "currentTime")
    private String currentTime;
    @Column(name = "hit")
    private boolean hit;

    public Result() {}

    public Result(double x, double y, double r, String currentTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.currentTime = currentTime;
    }

    public double getY() {
        return y;
    }

    public double getR() {
        return r;
    }

    public double getX() {
        return x;
    }

    public int getId() {
        return id;
    }

    public String getCurrentTime() {
        return currentTime;
    }

    public boolean isHit() {
        return hit;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    public void setR(double r) {
        this.r = r;
    }

    public void setX(double x) {
        this.x = x;
    }

    public void setY(double y) {
        this.y = y;
    }

    private boolean rectangle() {
        return x >= 0 && y <= 0 && x <= r  && Math.abs(y) <= r;
    }

    private boolean triangle() {
        return x >= 0 && y >= 0 && y <= (r - x) / 2;
    }

    private boolean circle() {
        return x <= 0 && y <= 0 && Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= r / 2;
    }

    public void checkIfHit() {
        hit = rectangle() || triangle() || circle();
    }

    @Override
    public String toString() {
        return "Result{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", currentTime=" + currentTime +
                ", isHit=" + hit +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Result)) return false;
        Result result = (Result) o;
        return Double.compare(result.getX(), getX()) == 0 &&
                Double.compare(result.getY(), getY()) == 0 &&
                Double.compare(result.getR(), getR()) == 0 &&
                isHit() == result.isHit();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getX(), getY(), getR(), isHit());
    }
}
